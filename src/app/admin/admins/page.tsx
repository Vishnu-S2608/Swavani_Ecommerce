"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllAdmins, setUserRole, createUserDoc } from "@/lib/firestore";
import type { UserDoc, AdminRole } from "@/lib/firestore";

export default function AdminTeamPage() {
  const { isSuperAdmin, user } = useAuth();
  const [admins, setAdmins] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New admin form state
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    adminRole: "manager" as AdminRole,
  });

  const load = async () => {
    setLoading(true);
    try {
      // 1. Direct Firestore client SDK (works always without service account key)
      const data = await getAllAdmins();
      setAdmins(data);
    } catch {
      // 2. Fallback to API route if client read is restricted
      try {
        const res = await fetch("/api/admin/admins");
        if (res.ok) {
          const data = await res.json();
          setAdmins(data.admins || []);
        }
      } catch (err) {
        console.error("Failed to load admin list:", err);
      }
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      // 1. Try server API route
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(`Admin "${form.displayName}" created successfully!`);
        setForm({ displayName: "", email: "", password: "", adminRole: "manager" });
        setShowAddForm(false);
        load();
        setSubmitting(false);
        return;
      }

      const data = await res.json();

      // If server returned 503 or error about service account credentials, use client-side secondary app
      if (
        res.status === 503 ||
        data.error?.includes("private key") ||
        data.error?.includes("credentials")
      ) {
        const { initializeApp, getApps } = await import("firebase/app");
        const { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } =
          await import("firebase/auth");
        const { firebaseConfig } = await import("@/lib/firebase");

        const secApp =
          getApps().find((a) => a.name === "SecondaryAdminApp") ||
          initializeApp(firebaseConfig, "SecondaryAdminApp");
        const secAuth = getAuth(secApp);

        const cred = await createUserWithEmailAndPassword(
          secAuth,
          form.email,
          form.password
        );
        if (form.displayName) {
          await updateProfile(cred.user, { displayName: form.displayName });
        }
        await createUserDoc(cred.user.uid, {
          email: form.email,
          displayName: form.displayName || "Admin",
          role: "admin",
          adminRole: form.adminRole,
        });
        await signOut(secAuth);

        setSuccess(`Admin "${form.displayName}" created successfully!`);
        setForm({ displayName: "", email: "", password: "", adminRole: "manager" });
        setShowAddForm(false);
        load();
        setSubmitting(false);
        return;
      }

      setError(data.error || "Failed to create admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create admin");
    }
    setSubmitting(false);
  };

  const handleRemove = async (id: string, name: string) => {
    if (!confirm(`Remove admin access for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess(`${name}'s admin access has been revoked.`);
        load();
        return;
      }
      // fallback to direct firestore update
      await setUserRole(id, "customer");
      setSuccess(`${name}'s admin access has been revoked.`);
      load();
    } catch {
      try {
        await setUserRole(id, "customer");
        setSuccess(`${name}'s admin access has been revoked.`);
        load();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to remove admin.");
      }
    }
  };

  const handleRoleChange = async (id: string, newRole: AdminRole) => {
    try {
      const res = await fetch(`/api/admin/admins/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminRole: newRole }),
      });
      if (res.ok) {
        setSuccess("Role updated.");
        load();
        return;
      }
      // fallback to direct firestore update
      await setUserRole(id, "admin", newRole);
      setSuccess("Role updated.");
      load();
    } catch {
      try {
        await setUserRole(id, "admin", newRole);
        setSuccess("Role updated.");
        load();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to update role.");
      }
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Admin Team</h1>
          <p className="page-sub">Manage who has access to the admin portal</p>
        </div>
        {isSuperAdmin && (
          <button className="btn-primary" onClick={() => setShowAddForm((v) => !v)}>
            + Add Admin
          </button>
        )}
      </header>

      {success && <div className="alert-success">{success}</div>}
      {error && <div className="alert-error">{error}</div>}

      {/* Add Admin Form */}
      {showAddForm && isSuperAdmin && (
        <div className="add-form-card">
          <h2 className="form-title">Create New Admin</h2>
          <form onSubmit={handleAdd} className="add-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  required
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  placeholder="Priya Sharma"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="priya@swavani.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Temporary Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={form.adminRole}
                  onChange={(e) => setForm({ ...form, adminRole: e.target.value as AdminRole })}
                >
                  <option value="manager">Manager</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Creating…" : "Create Admin"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin list */}
      <div className="admins-list">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading admins…</p>
          </div>
        ) : (
          admins.map((admin) => (
            <div key={admin.id} className="admin-card">
              <div className="admin-avatar">
                {admin.displayName?.[0] || "A"}
              </div>
              <div className="admin-info">
                <p className="admin-name">
                  {admin.displayName}
                  {admin.id === user?.uid && (
                    <span className="you-badge">You</span>
                  )}
                </p>
                <p className="admin-email">{admin.email}</p>
              </div>
              <div className="admin-role-wrap">
                {isSuperAdmin && admin.id !== user?.uid ? (
                  <select
                    className="role-select"
                    value={admin.adminRole || "manager"}
                    onChange={(e) => handleRoleChange(admin.id!, e.target.value as AdminRole)}
                  >
                    <option value="manager">Manager</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                ) : (
                  <span className={`role-badge ${admin.adminRole}`}>
                    {admin.adminRole?.replace("_", " ") || "manager"}
                  </span>
                )}
              </div>
              {isSuperAdmin && admin.id !== user?.uid && (
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(admin.id!, admin.displayName)}
                >
                  Revoke
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {!isSuperAdmin && (
        <p className="info-note">
          ℹ️ Only Super Admins can add or remove admin team members.
        </p>
      )}

      <style jsx>{`
        .page { max-width: 900px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; gap: 1rem; flex-wrap: wrap; }
        .page-title { font-size: 28px; font-weight: 700; color: #3A0A18; margin: 0 0 0.25rem; font-family: 'Cinzel', serif, system-ui; }
        .page-sub { font-size: 14px; color: #765C54; margin: 0; }
        
        .btn-primary { background: linear-gradient(135deg, #3A0A18, #601228); color: #FDF9F5; border: 1px solid rgba(217,178,109,0.4); font-weight: 700; font-size: 13px; border-radius: 10px; padding: 0.7rem 1.35rem; cursor: pointer; transition: opacity 0.15s, transform 0.15s; box-shadow: 0 4px 12px rgba(58,10,24,0.15); }
        .btn-primary:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-ghost { background: transparent; border: 1px solid rgba(180,120,60,0.3); color: #6C554D; font-size: 13px; font-weight: 600; border-radius: 10px; padding: 0.65rem 1.25rem; cursor: pointer; }
        .btn-ghost:hover { background: rgba(180,120,60,0.08); color: #3A0A18; }
        .btn-remove { background: #FFEBEE; border: 1px solid #FFCDD2; color: #C62828; font-size: 12px; font-weight: 600; border-radius: 8px; padding: 0.45rem 0.85rem; cursor: pointer; transition: background 0.15s; }
        .btn-remove:hover { background: #FFCDD2; }
        
        .alert-success { background: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 10px; padding: 0.75rem 1rem; color: #1B5E20; font-size: 14px; font-weight: 600; margin-bottom: 1.25rem; }
        .alert-error { background: #FFEBEE; border: 1px solid #FFCDD2; border-radius: 10px; padding: 0.75rem 1rem; color: #B71C1C; font-size: 14px; font-weight: 600; margin-bottom: 1.25rem; }
        
        .add-form-card { background: #FFFFFF; border: 1px solid rgba(180,120,60,0.22); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; box-shadow: 0 4px 20px rgba(90,50,20,0.05); }
        .form-title { font-size: 18px; font-weight: 700; color: #3A0A18; margin: 0 0 1.25rem; font-family: 'Cinzel', serif; }
        .add-form { display: flex; flex-direction: column; gap: 1.15rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
        .form-group label { font-size: 11px; font-weight: 700; color: #6C554D; letter-spacing: 0.06em; text-transform: uppercase; }
        .form-group input, .form-group select { background: #FAF6F0; border: 1px solid rgba(180,120,60,0.25); border-radius: 8px; padding: 0.7rem 0.875rem; color: #2D1E1E; font-size: 14px; outline: none; }
        .form-group input:focus, .form-group select:focus { border-color: #B4783C; box-shadow: 0 0 0 3px rgba(180,120,60,0.1); }
        .form-group select option { background: #FFFFFF; color: #2D1E1E; }
        .form-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
        
        .admins-list { display: flex; flex-direction: column; gap: 0.85rem; }
        .admin-card { display: flex; align-items: center; gap: 1.15rem; background: #FFFFFF; border: 1px solid rgba(180,120,60,0.18); border-radius: 14px; padding: 1.15rem 1.35rem; box-shadow: 0 4px 16px rgba(90,50,20,0.04); }
        .admin-avatar { width: 44px; height: 44px; background: linear-gradient(135deg, #3A0A18, #601228); border: 1px solid rgba(217,178,109,0.5); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: #D9B26D; flex-shrink: 0; }
        .admin-info { flex: 1; min-width: 0; }
        .admin-name { font-size: 15px; font-weight: 700; color: #2D1E1E; margin: 0 0 0.2rem; display: flex; align-items: center; gap: 0.5rem; }
        .admin-email { font-size: 13px; color: #8C746A; margin: 0; }
        .you-badge { background: rgba(180,120,60,0.15); color: #B4783C; font-size: 10px; padding: 0.15rem 0.55rem; border-radius: 999px; font-weight: 700; letter-spacing: 0.05em; border: 1px solid rgba(180,120,60,0.3); }
        
        .admin-role-wrap { display: flex; align-items: center; }
        .role-select { background: #FAF6F0; border: 1px solid rgba(180,120,60,0.25); border-radius: 8px; padding: 0.45rem 0.85rem; color: #2D1E1E; font-size: 12px; font-weight: 600; outline: none; cursor: pointer; }
        .role-select option { background: #FFFFFF; color: #2D1E1E; }
        .role-badge { padding: 0.3rem 0.85rem; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: capitalize; letter-spacing: 0.03em; border: 1px solid transparent; }
        .role-badge.super_admin { background: #FDF4E7; border-color: #EBDCC5; color: #B4783C; }
        .role-badge.manager { background: #EEF2FF; border-color: #C7D2FE; color: #4338CA; }
        
        .loading-state { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 3rem; color: #8C746A; }
        .spinner { width: 28px; height: 28px; border: 2px solid rgba(180,120,60,0.2); border-top-color: #B4783C; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .info-note { font-size: 13px; color: #6C554D; margin-top: 1.5rem; padding: 0.85rem 1.15rem; background: #FFFFFF; border: 1px solid rgba(180,120,60,0.18); border-radius: 10px; box-shadow: 0 2px 8px rgba(90,50,20,0.02); }
        
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
