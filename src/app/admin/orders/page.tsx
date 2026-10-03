"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, OrderDoc, OrderStatus } from "@/lib/firestore";

const STATUS_OPTIONS: { label: string; value: OrderStatus; color: string }[] = [
  { label: "Pending", value: "pending", color: "#f59e0b" },
  { label: "Paid", value: "paid", color: "#10b981" },
  { label: "Processing", value: "processing", color: "#6366f1" },
  { label: "Shipped", value: "shipped", color: "#3b82f6" },
  { label: "Delivered", value: "delivered", color: "#22c55e" },
  { label: "Cancelled", value: "cancelled", color: "#ef4444" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderDoc | null>(null);
  const [updating, setUpdating] = useState(false);
  const [trackingInput, setTrackingInput] = useState("");
  const [statusInput, setStatusInput] = useState<OrderStatus>("pending");
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders(100);
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const openDetail = (order: OrderDoc) => {
    setSelectedOrder(order);
    setStatusInput(order.status);
    setTrackingInput(order.trackingNumber || "");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder?.id) return;
    setUpdating(true);
    try {
      await updateOrderStatus(selectedOrder.id, statusInput, {
        trackingNumber: trackingInput,
      });
      setFeedback("Order status & tracking updated successfully.");
      setTimeout(() => setFeedback(null), 3000);
      await loadOrders();
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: statusInput, trackingNumber: trackingInput } : null
      );
    } catch (err) {
      alert("Failed to update order");
    } finally {
      setUpdating(false);
    }
  };

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const getStatusColor = (status: OrderStatus) => {
    return STATUS_OPTIONS.find((s) => s.value === status)?.color || "#94a3b8";
  };

  const filteredOrders = orders.filter((o) => {
    const query = search.toLowerCase();
    const matchesSearch =
      (o.id && o.id.toLowerCase().includes(query)) ||
      o.userName?.toLowerCase().includes(query) ||
      o.userEmail?.toLowerCase().includes(query) ||
      o.shippingAddress?.city?.toLowerCase().includes(query);
    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Orders Management</h1>
          <p className="page-sub">Track customer purchases, fulfillment status, and shipments</p>
        </div>
        <button onClick={loadOrders} className="btn-refresh" title="Refresh Orders">
          🔄 Refresh
        </button>
      </header>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by order ID, customer name, email, or city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="status-tabs">
          <button
            onClick={() => setFilterStatus("all")}
            className={`tab-btn ${filterStatus === "all" ? "active" : ""}`}
          >
            All ({orders.length})
          </button>
          {STATUS_OPTIONS.map((s) => {
            const count = orders.filter((o) => o.status === s.value).length;
            return (
              <button
                key={s.value}
                onClick={() => setFilterStatus(s.value)}
                className={`tab-btn ${filterStatus === s.value ? "active" : ""}`}
              >
                {s.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading orders from Firestore…</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No orders found</p>
          <p className="empty-sub">
            {orders.length === 0
              ? "No customer orders have been placed yet. When orders are created via checkout, they will appear here in real-time."
              : "No orders match the current search or status filter."}
          </p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Placed On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const color = getStatusColor(order.status);
                return (
                  <tr key={order.id} onClick={() => openDetail(order)} className="order-row">
                    <td className="order-id">#{order.id?.slice(0, 8)}</td>
                    <td>
                      <div className="cust-info">
                        <span className="cust-name">{order.userName || "Customer"}</span>
                        <span className="cust-email">{order.userEmail}</span>
                      </div>
                    </td>
                    <td>
                      <span className="city-badge">
                        {order.shippingAddress?.city || "—"},{" "}
                        {order.shippingAddress?.state || ""}
                      </span>
                    </td>
                    <td>
                      {order.items?.length || 0} saree
                      {(order.items?.length || 0) !== 1 ? "s" : ""}
                    </td>
                    <td className="order-total">{fmtCurrency(order.total || 0)}</td>
                    <td>
                      <span
                        className="status-pill"
                        style={{ background: `${color}20`, color, borderColor: `${color}40` }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="order-date">
                      {order.createdAt
                        ? order.createdAt.toDate().toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(order);
                        }}
                        className="btn-view"
                      >
                        View & Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="drawer-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h2 className="drawer-title">Order #{selectedOrder.id?.slice(0, 8)}</h2>
                <p className="drawer-sub">
                  Placed on{" "}
                  {selectedOrder.createdAt
                    ? selectedOrder.createdAt.toDate().toLocaleString("en-IN")
                    : "—"}
                </p>
              </div>
              <button className="drawer-close" onClick={() => setSelectedOrder(null)}>
                ✕
              </button>
            </div>

            {feedback && <div className="drawer-feedback">✓ {feedback}</div>}

            <div className="drawer-body">
              {/* Status Update Form */}
              <div className="detail-section highlight-box">
                <h3 className="section-title">Update Fulfillment</h3>
                <form onSubmit={handleUpdate} className="status-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value as OrderStatus)}
                        className="form-select"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Courier Tracking Number</label>
                      <input
                        type="text"
                        placeholder="e.g. BLUEDART-987654321"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={updating} className="btn-save-status">
                    {updating ? "Saving…" : "Save Status & Tracking"}
                  </button>
                </form>
              </div>

              {/* Customer details */}
              <div className="detail-section">
                <h3 className="section-title">Customer & Delivery Address</h3>
                <div className="address-box">
                  <p className="addr-name">{selectedOrder.shippingAddress?.name || selectedOrder.userName}</p>
                  <p className="addr-phone">📞 {selectedOrder.shippingAddress?.phone || "No phone provided"}</p>
                  <p className="addr-line">{selectedOrder.shippingAddress?.line1}</p>
                  {selectedOrder.shippingAddress?.line2 && (
                    <p className="addr-line">{selectedOrder.shippingAddress.line2}</p>
                  )}
                  <p className="addr-city">
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} -{" "}
                    {selectedOrder.shippingAddress?.pincode}
                  </p>
                  <p className="addr-email">✉️ {selectedOrder.userEmail}</p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="detail-section">
                <h3 className="section-title">Items in Order ({selectedOrder.items?.length || 0})</h3>
                <div className="items-list">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="item-row">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className="item-thumb" />
                      )}
                      <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-qty">Qty: {item.qty} × ₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                      <span className="item-total">
                        ₹{(item.qty * item.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="detail-section summary-section">
                <div className="sum-row">
                  <span>Subtotal</span>
                  <span>{fmtCurrency(selectedOrder.subtotal || 0)}</span>
                </div>
                <div className="sum-row">
                  <span>Shipping</span>
                  <span>{selectedOrder.shipping ? fmtCurrency(selectedOrder.shipping) : "FREE"}</span>
                </div>
                <div className="sum-row total-row">
                  <span>Total Amount</span>
                  <span className="total-val">{fmtCurrency(selectedOrder.total || 0)}</span>
                </div>
                {selectedOrder.razorpayPaymentId && (
                  <p className="payment-ref">
                    Payment Ref: <code>{selectedOrder.razorpayPaymentId}</code>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .orders-page { max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; gap: 1rem; }
        .page-title { font-size: 28px; font-weight: 700; color: #3A0A18; margin: 0 0 0.25rem; font-family: 'Cinzel', serif, system-ui; }
        .page-sub { font-size: 14px; color: #765C54; margin: 0; }

        .btn-refresh { background: #FFFFFF; border: 1px solid rgba(180,120,60,0.25); color: #3A0A18; border-radius: 8px; padding: 0.55rem 1.1rem; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; box-shadow: 0 2px 8px rgba(90,50,20,0.03); }
        .btn-refresh:hover { background: #FAF6F0; }

        /* Filter bar */
        .filter-bar { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .search-wrap { display: flex; align-items: center; background: #FFFFFF; border: 1px solid rgba(180,120,60,0.2); border-radius: 10px; padding: 0.6rem 0.875rem; gap: 0.5rem; max-width: 600px; box-shadow: 0 2px 8px rgba(90,50,20,0.03); }
        .search-icon { font-size: 14px; opacity: 0.5; }
        .search-input { background: transparent; border: none; outline: none; color: #2D1E1E; font-size: 14px; width: 100%; }
        .search-input::placeholder { color: #8C746A; }

        .status-tabs { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.25rem; }
        .tab-btn { background: #FFFFFF; border: 1px solid rgba(180,120,60,0.2); border-radius: 8px; padding: 0.5rem 0.95rem; color: #6C554D; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.15s, color 0.15s; box-shadow: 0 2px 6px rgba(90,50,20,0.02); }
        .tab-btn:hover { color: #3A0A18; background: #FAF6F0; }
        .tab-btn.active { background: #3A0A18; border-color: #3A0A18; color: #FDF9F5; }

        /* Table */
        .table-wrap { background: #FFFFFF; border: 1px solid rgba(180,120,60,0.18); border-radius: 16px; overflow-x: auto; box-shadow: 0 4px 20px rgba(90,50,20,0.04); }
        .orders-table { width: 100%; border-collapse: collapse; text-align: left; }
        .orders-table th { padding: 0.85rem 1.25rem; font-size: 11px; font-weight: 700; color: #8C746A; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid rgba(180,120,60,0.12); background: #FAF6F0; }
        .orders-table td { padding: 1rem 1.25rem; font-size: 13px; color: #4A352F; border-bottom: 1px solid rgba(180,120,60,0.08); }
        .order-row { cursor: pointer; transition: background 0.15s; }
        .order-row:hover { background: #FDF9F4; }

        .order-id { font-family: monospace; color: #B4783C; font-weight: 700; font-size: 13px; }
        .cust-info { display: flex; flex-direction: column; gap: 2px; }
        .cust-name { font-weight: 700; color: #2D1E1E; font-size: 13px; }
        .cust-email { font-size: 11px; color: #8C746A; }
        .city-badge { font-size: 12px; color: #6C554D; font-weight: 500; }
        .order-total { font-weight: 700; color: #3A0A18; font-size: 14px; }
        .order-date { font-size: 12px; color: #8C746A; }

        .status-pill { display: inline-block; padding: 0.25rem 0.65rem; border-radius: 999px; font-size: 11px; font-weight: 600; text-transform: capitalize; border: 1px solid; }

        .btn-view { background: #FAF6F0; border: 1px solid rgba(180,120,60,0.25); color: #3A0A18; padding: 0.4rem 0.85rem; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .btn-view:hover { background: #F3ECE2; }

        /* Drawer */
        .drawer-overlay { position: fixed; inset: 0; background: rgba(30,15,10,0.6); backdrop-filter: blur(8px); z-index: 200; display: flex; justify-content: flex-end; }
        .drawer { width: 100%; max-width: 520px; height: 100%; background: #FAF6F0; border-left: 1px solid rgba(180,120,60,0.25); overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; box-shadow: -10px 0 40px rgba(50,25,10,0.25); }
        .drawer-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(180,120,60,0.15); padding-bottom: 1rem; }
        .drawer-title { font-size: 22px; font-weight: 700; color: #3A0A18; margin: 0 0 0.2rem; font-family: 'Cinzel', serif; }
        .drawer-sub { font-size: 12px; color: #765C54; margin: 0; }
        .drawer-close { background: transparent; border: none; color: #8C746A; font-size: 20px; cursor: pointer; }
        .drawer-close:hover { color: #3A0A18; }

        .drawer-feedback { background: #E8F5E9; border: 1px solid #A5D6A7; color: #1B5E20; padding: 0.65rem 1rem; border-radius: 8px; font-size: 13px; font-weight: 600; }

        .drawer-body { display: flex; flex-direction: column; gap: 1.5rem; }
        .detail-section { display: flex; flex-direction: column; gap: 0.75rem; }
        .highlight-box { background: #FFFFFF; border: 1px solid rgba(180,120,60,0.2); border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 10px rgba(90,50,20,0.03); }
        .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #B4783C; margin: 0; }

        .status-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.35rem; }
        .form-group label { font-size: 11px; color: #6C554D; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; }
        .form-select, .form-input { background: #FAF6F0; border: 1px solid rgba(180,120,60,0.25); border-radius: 8px; padding: 0.65rem 0.75rem; color: #2D1E1E; font-size: 13px; outline: none; }
        .form-select:focus, .form-input:focus { border-color: #B4783C; }
        .form-select option { background: #FFFFFF; color: #2D1E1E; }
        .btn-save-status { background: linear-gradient(135deg, #3A0A18, #601228); color: #FDF9F5; border: 1px solid rgba(217,178,109,0.4); border-radius: 8px; padding: 0.75rem; font-weight: 700; font-size: 13px; cursor: pointer; transition: opacity 0.15s; box-shadow: 0 4px 12px rgba(58,10,24,0.15); }
        .btn-save-status:hover:not(:disabled) { opacity: 0.92; }

        .address-box { background: #FFFFFF; border: 1px solid rgba(180,120,60,0.18); border-radius: 10px; padding: 1rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 13px; color: #4A352F; box-shadow: 0 2px 8px rgba(90,50,20,0.03); }
        .addr-name { font-weight: 700; color: #2D1E1E; }
        .addr-phone, .addr-email { color: #B4783C; font-size: 12px; font-weight: 600; }

        .items-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .item-row { display: flex; align-items: center; gap: 0.75rem; background: #FFFFFF; border: 1px solid rgba(180,120,60,0.12); border-radius: 8px; padding: 0.65rem; }
        .item-thumb { width: 44px; height: 56px; object-fit: cover; border-radius: 4px; }
        .item-details { flex: 1; min-width: 0; }
        .item-name { font-size: 13px; font-weight: 700; color: #2D1E1E; margin: 0 0 2px; }
        .item-qty { font-size: 11px; color: #8C746A; margin: 0; }
        .item-total { font-weight: 700; color: #3A0A18; font-size: 13px; }

        .summary-section { border-top: 1px solid rgba(180,120,60,0.15); padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .sum-row { display: flex; justify-content: space-between; font-size: 13px; color: #6C554D; }
        .total-row { font-size: 16px; font-weight: 700; color: #2D1E1E; border-top: 1px solid rgba(180,120,60,0.12); padding-top: 0.5rem; }
        .total-val { color: #3A0A18; font-size: 18px; }
        .payment-ref { font-size: 11px; color: #8C746A; margin: 0.5rem 0 0; }
        .payment-ref code { color: #B4783C; font-weight: 600; }

        .loading-state, .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; color: #8C746A; text-align: center; }
        .empty-title { font-size: 18px; font-weight: 700; color: #3A0A18; margin: 0 0 0.5rem; }
        .empty-sub { font-size: 14px; max-width: 440px; margin: 0; line-height: 1.5; }
        .spinner { width: 32px; height: 32px; border: 3px solid rgba(180,120,60,0.2); border-top-color: #B4783C; border-radius: 50%; animation: spin 0.7s linear infinite; margin-bottom: 1rem; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
