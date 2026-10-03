/**
 * Seed script — runs once to populate Firestore with initial products
 * and create your first super_admin account.
 *
 * Usage:
 *   node scripts/seed-firestore.mjs
 *
 * Requirements:
 *   - Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local
 *   - npm install dotenv (already available via firebase-admin)
 */

import { readFileSync } from "fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// ─── Load env ────────────────────────────────────────────────────────────────

const envFile = readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envFile.split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const [k, ...v] = l.split("=");
      return [k.trim(), v.join("=").trim().replace(/^"(.*)"$/, "$1")];
    })
);

// ─── Init Admin SDK ──────────────────────────────────────────────────────────

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();
const auth = getAuth();

// ─── Products to seed ────────────────────────────────────────────────────────

const products = [
  {
    name: "Crimson Kanjivaram Silk",
    subtitle: "Royal Zari Weave",
    price: 12999, mrp: 18999,
    imageUrl: "/saree-1.jpg",
    hoverImageUrl: "/hero-model.jpg",
    category: "Silk Sarees", fabric: "Kanjivaram Silk", occasion: "Wedding",
    colors: ["#8B0000", "#D4AF37"],
    isNew: true, isBestseller: true,
    rating: 4.9, reviews: 248,
    stock: 15, isActive: true,
    description: "A masterpiece of Kanjivaram weaving, adorned with traditional gold zari motifs.",
  },
  {
    name: "Emerald Banarasi Silk",
    subtitle: "Heritage Gold Brocade",
    price: 9499, mrp: 14999,
    imageUrl: "/saree-1.jpg", hoverImageUrl: "/saree-1.jpg",
    category: "Silk Sarees", fabric: "Banarasi Silk", occasion: "Festival",
    colors: ["#1a5c2a", "#D4AF37"],
    isNew: true, isBestseller: false,
    rating: 4.8, reviews: 182,
    stock: 8, isActive: true,
    description: "Rich emerald green Banarasi silk with intricate gold brocade weaving.",
  },
  {
    name: "Royal Blue Kanjivaram",
    subtitle: "Pearl Gold Pallu",
    price: 11499, mrp: 16999,
    imageUrl: "/saree-2.jpg", hoverImageUrl: "/saree-2.jpg",
    category: "Silk Sarees", fabric: "Kanjivaram Silk", occasion: "Wedding",
    colors: ["#003580", "#D4AF37"],
    isNew: false, isBestseller: true,
    rating: 4.9, reviews: 317,
    stock: 12, isActive: true,
    description: "Majestic royal blue Kanjivaram adorned with pearl-hued gold zari.",
  },
  {
    name: "Maroon Patola Silk",
    subtitle: "Ikat Geometric Art",
    price: 8999, mrp: 13499,
    imageUrl: "/saree-3.jpg", hoverImageUrl: "/saree-3.jpg",
    category: "Handloom", fabric: "Patola Silk", occasion: "Festival",
    colors: ["#6B0000", "#F0D080"],
    isNew: false, isBestseller: false,
    rating: 4.7, reviews: 94,
    stock: 5, isActive: true,
    description: "Traditional Patola double-ikat weaving from Gujarat.",
  },
  {
    name: "Golden Bridal Kanjivaram",
    subtitle: "Temple Border Bridal",
    price: 24999, mrp: 35999,
    imageUrl: "/saree-4.jpg", hoverImageUrl: "/saree-4.jpg",
    category: "Bridal", fabric: "Kanjivaram Silk", occasion: "Bridal",
    colors: ["#C9963F", "#8B0000"],
    isNew: true, isBestseller: true,
    rating: 5.0, reviews: 89,
    stock: 3, isActive: true,
    description: "The pinnacle of bridal luxury — a golden Kanjivaram with deep crimson temple borders.",
  },
  {
    name: "Blue Chanderi Elegance",
    subtitle: "Sheer Silver Weave",
    price: 4999, mrp: 7499,
    imageUrl: "/saree-5.jpg", hoverImageUrl: "/saree-5.jpg",
    category: "Casual", fabric: "Chanderi Silk", occasion: "Casual",
    colors: ["#ADD8E6", "#C0C0C0"],
    isNew: true, isBestseller: false,
    rating: 4.6, reviews: 156,
    stock: 20, isActive: true,
    description: "Light-as-air Chanderi silk with delicate silver thread florals.",
  },
];

// ─── First super admin ────────────────────────────────────────────────────────
// Change these before running!

const FIRST_ADMIN_EMAIL = "admin@swavani.com";
const FIRST_ADMIN_PASSWORD = "ChangeMe@123"; // CHANGE THIS!
const FIRST_ADMIN_NAME = "Swavani Admin";

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Firestore…\n");

  // Seed products
  const batch = db.batch();
  for (const product of products) {
    const ref = db.collection("products").doc();
    batch.set(ref, { ...product, createdAt: new Date(), updatedAt: new Date() });
  }
  await batch.commit();
  console.log(`✅ Seeded ${products.length} products`);

  // Create first super admin
  let adminUser;
  try {
    adminUser = await auth.createUser({
      email: FIRST_ADMIN_EMAIL,
      password: FIRST_ADMIN_PASSWORD,
      displayName: FIRST_ADMIN_NAME,
    });
    console.log(`✅ Created Firebase Auth user: ${FIRST_ADMIN_EMAIL}`);
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      const existing = await auth.getUserByEmail(FIRST_ADMIN_EMAIL);
      adminUser = existing;
      console.log(`ℹ️  Admin user already exists: ${FIRST_ADMIN_EMAIL}`);
    } else {
      throw err;
    }
  }

  // Set Firestore user doc with super_admin role
  await db.collection("users").doc(adminUser.uid).set({
    email: FIRST_ADMIN_EMAIL,
    displayName: FIRST_ADMIN_NAME,
    role: "admin",
    adminRole: "super_admin",
    createdAt: new Date(),
  });
  console.log(`✅ Set super_admin role for ${FIRST_ADMIN_EMAIL}`);

  console.log("\n🎉 Seed complete!");
  console.log(`\n📝 Admin login:\n   Email: ${FIRST_ADMIN_EMAIL}\n   Password: ${FIRST_ADMIN_PASSWORD}`);
  console.log("\n⚠️  Change the password immediately after first login!\n");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
