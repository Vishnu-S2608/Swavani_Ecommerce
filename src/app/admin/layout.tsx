"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import "./admin.css";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/admins", label: "Admin Team", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, userDoc, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!loading && (!user || !isAdmin)) {
      router.replace("/admin/login");
    }
  }, [loading, user, isAdmin, router, pathname]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // If on admin login page, render children directly without admin shell or loading block
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    await signOut();
    router.push("/admin/login");
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <div className="sidebar-logo-mark">HS</div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileMenuOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? "open" : "collapsed"} ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        {/* Mobile Close Button */}
        <button
          className="mobile-close-btn"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close mobile menu"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Toggle Collapse Button (Desktop Only) */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft size={14} strokeWidth={2.5} />
          ) : (
            <ChevronRight size={14} strokeWidth={2.5} />
          )}
        </button>

        {/* Brand Header */}
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-mark">HS</div>
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="sidebar-logo-text-wrap">
              <span className="sidebar-logo-title">SWAVANI</span>
              <span className="sidebar-logo-sub">Admin Portal</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                title={!sidebarOpen && !mobileMenuOpen ? item.label : undefined}
              >
                <div className="sidebar-icon-wrap">
                  <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                {(sidebarOpen || mobileMenuOpen) && (
                  <span className="sidebar-label">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Sign Out Footer */}
        <div className="sidebar-footer">
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="sidebar-user-card">
              <div className="sidebar-user-avatar">
                {userDoc?.displayName?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="sidebar-user-info">
                <p className="sidebar-user-name" title={userDoc?.displayName || "Admin"}>
                  {userDoc?.displayName || "Admin"}
                </p>
                <p className="sidebar-user-role">
                  {userDoc?.adminRole?.replace("_", " ") || "Admin"}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleSignOut}
            className="sidebar-signout-btn"
            title="Sign Out"
          >
            <LogOut size={15} strokeWidth={2} />
            {(sidebarOpen || mobileMenuOpen) && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">{children}</main>
    </div>
  );
}
