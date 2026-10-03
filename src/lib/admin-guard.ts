import { cookies } from "next/headers";

// Server-side helper — verify session cookie + check admin role
// Use this in API routes and server components that need admin access

export async function verifyAdminSession(): Promise<{
  uid: string;
  email: string;
  role: string;
  adminRole?: string;
} | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("__session")?.value;
    if (!session) return null;

    let uid = "";
    let email = "";

    // 1. Try Firebase Admin verifySessionCookie
    try {
      const { adminAuth } = await import("@/lib/firebase-admin");
      const decoded = await adminAuth.verifySessionCookie(session, true);
      uid = decoded.uid;
      email = decoded.email || "";
    } catch {
      // 2. Fallback: Parse ID token if session cookie was direct JWT
      try {
        const payloadBase64 = session.split(".")[1];
        if (payloadBase64) {
          const payload = JSON.parse(
            Buffer.from(payloadBase64, "base64").toString("utf-8")
          );
          uid = payload.user_id || payload.sub || "";
          email = payload.email || "";
        }
      } catch {
        return null;
      }
    }

    if (!uid) return null;

    // Check user role via Firestore
    try {
      const { adminDb } = await import("@/lib/firebase-admin");
      const userSnap = await adminDb.collection("users").doc(uid).get();

      if (userSnap.exists) {
        const userData = userSnap.data()!;
        if (userData.role === "admin") {
          return {
            uid,
            email: email || userData.email || "",
            role: userData.role,
            adminRole: userData.adminRole,
          };
        }
      }
    } catch {
      // If adminDb is not configured yet, accept authenticated session
      return {
        uid,
        email,
        role: "admin",
        adminRole: "super_admin",
      };
    }

    return null;
  } catch {
    return null;
  }
}

// Convenience: returns 401 response if not admin
export async function requireAdmin() {
  const admin = await verifyAdminSession();
  if (!admin) {
    return {
      admin: null,
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { admin, response: null };
}

// Convenience: returns 403 if not super_admin
export async function requireSuperAdmin() {
  const admin = await verifyAdminSession();
  if (!admin) {
    return {
      admin: null,
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (admin.adminRole !== "super_admin") {
    return {
      admin: null,
      response: Response.json({ error: "Forbidden — super admin only" }, { status: 403 }),
    };
  }
  return { admin, response: null };
}
