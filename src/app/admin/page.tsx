"use client";

import { useEffect, useState } from "react";
import { getAllOrders, getAllAdmins } from "@/lib/firestore";
import type { OrderDoc, UserDoc } from "@/lib/firestore";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Stats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  paidOrders: number;
  shippedOrders: number;
  revenue: number;
  todayRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [orders, productSnap] = await Promise.all([
        getAllOrders(100),
        getDocs(collection(db, "products")),
      ]);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const paidOrders = orders.filter((o) =>
        ["paid", "processing", "shipped", "delivered"].includes(o.status)
      );
      const revenue = paidOrders.reduce((s, o) => s + o.total, 0);
      const todayRevenue = paidOrders
        .filter((o) => o.createdAt && o.createdAt.toDate() >= today)
        .reduce((s, o) => s + o.total, 0);

      const activeProducts = productSnap.docs.filter(
        (d) => d.data().isActive !== false
      ).length;

      setStats({
        totalProducts: productSnap.size,
        activeProducts,
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        paidOrders: orders.filter((o) => o.status === "paid").length,
        shippedOrders: orders.filter((o) => o.status === "shipped").length,
        revenue,
        todayRevenue,
      });
      setRecentOrders(orders.slice(0, 8));
      setLoading(false);
    };
    load();
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const statusColor: Record<string, string> = {
    pending: "#f59e0b",
    paid: "#10b981",
    processing: "#6366f1",
    shipped: "#3b82f6",
    delivered: "#22c55e",
    cancelled: "#ef4444",
  };

  return (
    <div className="dash">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-sub">Welcome back — here's your store overview</p>
        </div>
      </header>

      {loading ? (
        <div className="dash-loading">
          <div className="spinner" />
          <p>Loading stats…</p>
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div className="stats-grid">
            <StatCard label="Total Revenue" value={fmt(stats!.revenue)} icon="₹" accent="#B4783C" />
            <StatCard label="Today's Revenue" value={fmt(stats!.todayRevenue)} icon="📈" accent="#2E7D32" />
            <StatCard label="Total Orders" value={String(stats!.totalOrders)} icon="◉" accent="#3A0A18" />
            <StatCard label="Shipped Orders" value={String(stats!.shippedOrders)} icon="🚚" accent="#2563EB" />
            <StatCard label="Active Products" value={String(stats!.activeProducts)} icon="◈" accent="#B4783C" />
            <StatCard label="Total Products" value={String(stats!.totalProducts)} icon="◈" accent="#8C746A" />
          </div>

          {/* Recent orders */}
          <section className="dash-section">
            <div className="section-header">
              <h2 className="section-title">Recent Orders</h2>
              <a href="/admin/orders" className="section-link">View all →</a>
            </div>
            <div className="orders-table-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">
                        <a href={`/admin/orders/${order.id}`}>
                          #{order.id?.slice(0, 8)}
                        </a>
                      </td>
                      <td className="customer-name">{order.userName}</td>
                      <td>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</td>
                      <td className="order-total">{fmt(order.total)}</td>
                      <td>
                        <span
                          className="status-badge"
                          style={{ background: `${statusColor[order.status]}18`, color: statusColor[order.status], border: `1px solid ${statusColor[order.status]}35` }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="order-date">
                        {order.createdAt
                          ? order.createdAt.toDate().toLocaleDateString("en-IN")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      <style jsx>{`
        .dash { max-width: 1200px; margin: 0 auto; }
        .dash-header { margin-bottom: 2rem; }
        .dash-title { font-size: 28px; font-weight: 700; color: #3A0A18; margin: 0 0 0.25rem; font-family: 'Cinzel', serif, system-ui; }
        .dash-sub { font-size: 14px; color: #765C54; margin: 0; }
        .dash-loading { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 4rem; color: #8C746A; }
        .spinner { width: 32px; height: 32px; border: 3px solid rgba(180,120,60,0.2); border-top-color: #B4783C; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.15rem; margin-bottom: 2.25rem; }
        
        .dash-section {
          background: #FFFFFF;
          border: 1px solid rgba(180,120,60,0.18);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(90,50,20,0.04);
        }
        .section-header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(180,120,60,0.12); background: #FAF6F0; }
        .section-title { font-size: 16px; font-weight: 700; color: #3A0A18; margin: 0; }
        .section-link { font-size: 13px; color: #B4783C; text-decoration: none; font-weight: 600; }
        .section-link:hover { text-decoration: underline; }
        
        .orders-table-wrap { overflow-x: auto; }
        .orders-table { width: 100%; border-collapse: collapse; }
        .orders-table th { padding: 0.85rem 1.5rem; text-align: left; font-size: 11px; font-weight: 700; color: #8C746A; letter-spacing: 0.08em; text-transform: uppercase; background: #FAF6F0; }
        .orders-table td { padding: 1rem 1.5rem; font-size: 14px; color: #4A352F; border-top: 1px solid rgba(180,120,60,0.08); }
        .orders-table tr:hover td { background: #FDF9F4; }
        .order-id a { color: #B4783C; text-decoration: none; font-family: monospace; font-size: 13px; font-weight: 600; }
        .customer-name { font-weight: 600; color: #2D1E1E; }
        .order-total { font-weight: 700; color: #3A0A18; }
        .order-date { color: #8C746A; font-size: 12px; }
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 11px; font-weight: 600; text-transform: capitalize; letter-spacing: 0.04em; }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color: accent }}>{icon}</div>
      <p className="stat-value" style={{ color: accent }}>{value}</p>
      <p className="stat-label">{label}</p>
      <style jsx>{`
        .stat-card {
          background: #FFFFFF;
          border: 1px solid rgba(180,120,60,0.18);
          border-radius: 16px;
          padding: 1.35rem;
          box-shadow: 0 4px 20px rgba(90,50,20,0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(90,50,20,0.08);
        }
        .stat-icon { font-size: 22px; margin-bottom: 0.65rem; }
        .stat-value { font-size: 26px; font-weight: 700; margin: 0 0 0.35rem; line-height: 1.1; }
        .stat-label { font-size: 12px; color: #8C746A; margin: 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
      `}</style>
    </div>
  );
}
