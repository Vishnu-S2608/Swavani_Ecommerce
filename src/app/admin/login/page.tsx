"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserDoc } from "@/lib/firestore";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Normal admin sign in
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Check Firestore role
      const userDoc = await getUserDoc(result.user.uid);
      if (!userDoc || userDoc.role !== "admin") {
        await auth.signOut();
        setError("Access denied. Admin privileges required.");
        setLoading(false);
        return;
      }

      // Create session cookie
      try {
        const idToken = await getIdToken(result.user);
        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });
      } catch (cookieErr) {
        console.warn("Session cookie warning:", cookieErr);
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      if (
        message.includes("user-not-found") ||
        message.includes("wrong-password") ||
        message.includes("invalid-credential")
      ) {
        setError("Invalid admin email or password. Please verify your credentials.");
      } else if (message.includes("too-many-requests")) {
        setError("Too many failed attempts. Please try again in a few minutes.");
      } else {
        setError(message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg" />

      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-logo">
          <span className="logo-mark">HS</span>
          <div>
            <p className="logo-brand">House of Swavani</p>
            <p className="logo-sub">Owner & Admin Portal</p>
          </div>
        </div>

        <h1 className="admin-login-title">Admin Sign In</h1>
        <p className="admin-login-desc">
          Enter your store owner or manager credentials
        </p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="admin-email">Admin Email Address</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@swavani.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="admin-login-error" role="alert">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="admin-login-btn">
            {loading ? <span className="btn-spinner" /> : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="store-return">
          <a href="/" className="admin-login-link">
            ← Return to Storefront
          </a>
        </div>
      </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FAF6F0;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          padding: 2rem 1rem;
        }
        .admin-login-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% -10%, rgba(180,120,60,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(96,18,40,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .admin-login-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          background: #FFFFFF;
          border: 1px solid rgba(180,120,60,0.25);
          border-radius: 20px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 24px 60px rgba(70,40,20,0.08), 0 0 0 1px rgba(255,255,255,0.8);
        }
        .admin-login-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(180,120,60,0.15);
        }
        .logo-mark {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #3A0A18, #601228);
          border: 1px solid rgba(217, 178, 109, 0.5);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #D9B26D;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .logo-brand {
          font-size: 15px;
          font-weight: 700;
          color: #3A0A18;
          margin: 0;
          line-height: 1.2;
        }
        .logo-sub {
          font-size: 11px;
          color: #8C746A;
          margin: 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .admin-login-title {
          font-size: 24px;
          font-weight: 700;
          color: #3A0A18;
          margin: 0 0 0.35rem;
          letter-spacing: -0.01em;
          font-family: 'Cinzel', serif;
        }
        .admin-login-desc {
          font-size: 13.5px;
          color: #765C54;
          margin: 0 0 1.75rem;
          line-height: 1.4;
        }
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .form-group label {
          font-size: 11px;
          font-weight: 700;
          color: #6C554D;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .form-group input {
          background: #FAF6F0;
          border: 1px solid rgba(180,120,60,0.25);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          color: #2D1E1E;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-group input::placeholder {
          color: #8C746A;
        }
        .form-group input:focus {
          border-color: #B4783C;
          box-shadow: 0 0 0 3px rgba(180,120,60,0.12);
        }
        .form-group input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .admin-login-error {
          background: #FFEBEE;
          border: 1px solid #FFCDD2;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 13px;
          color: #B71C1C;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.4;
          font-weight: 500;
        }
        .admin-login-btn {
          background: linear-gradient(135deg, #3A0A18, #601228);
          color: #FDF9F5;
          border: 1px solid rgba(217,178,109,0.4);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.04em;
          border-radius: 12px;
          padding: 0.85rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          margin-top: 0.5rem;
          box-shadow: 0 4px 14px rgba(58,10,24,0.2);
        }
        .admin-login-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .admin-login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .store-return {
          text-align: center;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(180,120,60,0.15);
        }
        .admin-login-link {
          color: #765C54;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          transition: color 0.15s;
        }
        .admin-login-link:hover {
          color: #3A0A18;
        }
      `}</style>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
