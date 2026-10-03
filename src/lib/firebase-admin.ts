import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

// Server-side only — never runs in browser
// Used in API routes (route.ts handlers)

let adminApp: App | null = null;

export function isFirebaseAdminConfigured(): boolean {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (
    !projectId ||
    !clientEmail ||
    !privateKey ||
    !privateKey.includes("BEGIN PRIVATE KEY") ||
    privateKey.includes("PASTE_YOUR_PRIVATE_KEY_HERE") ||
    clientEmail.includes("xxxxx")
  ) {
    return false;
  }
  return true;
}

export function getAdminApp(): App {
  if (adminApp) return adminApp;
  if (getApps().length > 0) {
    adminApp = getApps()[0];
    return adminApp;
  }

  if (!isFirebaseAdminConfigured()) {
    throw new Error(
      "Firebase Admin credentials are not yet configured. Please set a valid FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env.local file."
    );
  }

  const projectId = process.env.FIREBASE_PROJECT_ID!;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY!;

  // Handle escaped newlines in PEM format
  privateKey = privateKey.replace(/\\n/g, "\n");

  adminApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  return adminApp;
}

// Lazy Proxies: Prevents Firebase Admin from attempting initialization during Next.js
// build-time static page collection when service account credentials aren't supplied yet.
export const adminDb: Firestore = new Proxy({} as Firestore, {
  get(_target, prop) {
    const db = getFirestore(getAdminApp());
    const val = (db as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? val.bind(db) : val;
  },
});

export const adminAuth: Auth = new Proxy({} as Auth, {
  get(_target, prop) {
    const auth = getAuth(getAdminApp());
    const val = (auth as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? val.bind(auth) : val;
  },
});

export default adminApp;
