import { cookies } from "next/headers";

// POST /api/auth/session
// Sets a secure HTTP-only cookie for admin route authentication
export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return Response.json({ error: "Missing idToken" }, { status: 400 });
    }

    let sessionVal = idToken;
    let uid = "";

    // 1. Try to verify and create session cookie via Firebase Admin if credentials exist
    try {
      const { adminAuth } = await import("@/lib/firebase-admin");
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
      sessionVal = await adminAuth.createSessionCookie(idToken, { expiresIn });
    } catch (adminErr) {
      // If Firebase Admin credentials aren't fully configured in .env.local yet,
      // fallback to using the signed Firebase ID token directly as the session cookie.
      console.warn(
        "[auth/session] Firebase Admin SDK not configured or failed, using ID token as session:",
        adminErr instanceof Error ? adminErr.message : adminErr
      );

      try {
        const payloadBase64 = idToken.split(".")[1];
        if (payloadBase64) {
          const payload = JSON.parse(
            Buffer.from(payloadBase64, "base64").toString("utf-8")
          );
          uid = payload.user_id || payload.sub || "";
        }
      } catch (parseErr) {
        console.error("[auth/session] Failed to parse ID token payload:", parseErr);
      }
    }

    // 2. Set the __session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const cookieStore = await cookies();
    cookieStore.set("__session", sessionVal, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return Response.json({ uid, status: "ok" });
  } catch (err) {
    console.error("[auth/session] Error:", err);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}

// DELETE /api/auth/session
// Clears the session cookie on sign-out
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("__session");
  return Response.json({ status: "ok" });
}
