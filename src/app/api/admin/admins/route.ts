import { adminDb, adminAuth, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { requireAdmin, requireSuperAdmin } from "@/lib/admin-guard";

// GET /api/admin/admins — list all admins (any admin can view)
export async function GET() {
  const { admin, response } = await requireAdmin();
  if (response) return response;

  if (!isFirebaseAdminConfigured()) {
    return Response.json({
      admins: [],
      configured: false,
      message: "Firebase Admin credentials not configured in .env.local",
    });
  }

  try {
    const snap = await adminDb
      .collection("users")
      .where("role", "==", "admin")
      .get();

    const admins = snap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({
      id: d.id,
      email: d.data().email,
      displayName: d.data().displayName,
      adminRole: d.data().adminRole,
      createdAt: d.data().createdAt?.toDate().toISOString() ?? null,
    }));

    return Response.json({ admins, configured: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to load admins";
    return Response.json({ error: message, admins: [] }, { status: 500 });
  }
}

// POST /api/admin/admins — create a new admin (super_admin only)
export async function POST(request: Request) {
  const { admin, response } = await requireSuperAdmin();
  if (response) return response;

  const { email, displayName, adminRole, password } = await request.json();

  if (!email || !displayName || !password) {
    return Response.json(
      { error: "email, displayName, and password are required" },
      { status: 400 }
    );
  }

  const validRoles = ["super_admin", "manager"];
  const role = validRoles.includes(adminRole) ? adminRole : "manager";

  if (!isFirebaseAdminConfigured()) {
    return Response.json(
      {
        error:
          "Firebase Admin service account private key is not configured in .env.local. Please provide a valid service account private key to create admins via server API.",
      },
      { status: 503 }
    );
  }

  // Create Firebase Auth user
  let newUser;
  try {
    newUser = await adminAuth.createUser({ email, password, displayName });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create user";
    return Response.json({ error: message }, { status: 400 });
  }

  // Create Firestore user doc
  await adminDb.collection("users").doc(newUser.uid).set({
    email,
    displayName,
    role: "admin",
    adminRole: role,
    createdAt: new Date(),
    createdBy: admin!.uid,
  });

  return Response.json({
    id: newUser.uid,
    email,
    displayName,
    adminRole: role,
  });
}
