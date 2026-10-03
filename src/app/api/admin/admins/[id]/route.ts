import { adminDb, adminAuth, isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-guard";

// DELETE /api/admin/admins/[id] — remove an admin (super_admin only)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireSuperAdmin();
  if (response) return response;

  if (!isFirebaseAdminConfigured()) {
    return Response.json(
      { error: "Firebase Admin credentials not configured" },
      { status: 503 }
    );
  }

  const { id } = await params;

  // Cannot delete yourself (handled client-side too, but double-check here)
  const userSnap = await adminDb.collection("users").doc(id).get();
  if (!userSnap.exists) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Downgrade to customer in Firestore
  await adminDb.collection("users").doc(id).update({
    role: "customer",
    adminRole: null,
  });

  // Optionally disable the Firebase Auth user instead of deleting
  await adminAuth.updateUser(id, { disabled: true });

  return Response.json({ status: "ok" });
}

// PATCH /api/admin/admins/[id] — update admin role (super_admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireSuperAdmin();
  if (response) return response;

  if (!isFirebaseAdminConfigured()) {
    return Response.json(
      { error: "Firebase Admin credentials not configured" },
      { status: 503 }
    );
  }

  const { id } = await params;
  const { adminRole } = await request.json();

  const validRoles = ["super_admin", "manager"];
  if (!validRoles.includes(adminRole)) {
    return Response.json({ error: "Invalid adminRole" }, { status: 400 });
  }

  await adminDb.collection("users").doc(id).update({ adminRole });
  return Response.json({ status: "ok", adminRole });
}
