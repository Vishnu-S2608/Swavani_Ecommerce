import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductDoc {
  id?: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  imageUrl: string;
  hoverImageUrl: string;
  category: string;
  fabric: string;
  occasion: string;
  colors: string[];
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviews: number;
  description: string;
  stock: number;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
  imageUrl: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderDoc {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  trackingNumber?: string;
  shippingAddress: ShippingAddress;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export type AdminRole = "super_admin" | "manager";

export interface UserDoc {
  id?: string;
  email: string;
  displayName: string;
  phone?: string;
  role: "customer" | "admin";
  adminRole?: AdminRole;
  addresses?: ShippingAddress[];
  createdAt?: Timestamp;
}

// ─── Collection references ────────────────────────────────────────────────────

const PRODUCTS = "products";
const ORDERS = "orders";
const USERS = "users";

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(
  constraints: QueryConstraint[] = []
): Promise<ProductDoc[]> {
  const q = query(collection(db, PRODUCTS), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProductDoc));
}

export async function getActiveProducts(): Promise<ProductDoc[]> {
  return getProducts([where("isActive", "==", true)]);
}

export async function getProductsByCategory(
  category: string
): Promise<ProductDoc[]> {
  return getProducts([
    where("isActive", "==", true),
    where("category", "==", category),
  ]);
}

export async function getProductById(id: string): Promise<ProductDoc | null> {
  const snap = await getDoc(doc(db, PRODUCTS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ProductDoc;
}

export async function createProduct(
  data: Omit<ProductDoc, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, PRODUCTS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(
  id: string,
  data: Partial<ProductDoc>
): Promise<void> {
  await updateDoc(doc(db, PRODUCTS, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function softDeleteProduct(id: string): Promise<void> {
  await updateDoc(doc(db, PRODUCTS, id), {
    isActive: false,
    updatedAt: serverTimestamp(),
  });
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(
  data: Omit<OrderDoc, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, ORDERS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getOrderById(id: string): Promise<OrderDoc | null> {
  const snap = await getDoc(doc(db, ORDERS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as OrderDoc;
}

export async function getOrdersByUser(userId: string): Promise<OrderDoc[]> {
  const q = query(
    collection(db, ORDERS),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderDoc));
}

export async function getAllOrders(limitCount = 50): Promise<OrderDoc[]> {
  const q = query(
    collection(db, ORDERS),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as OrderDoc));
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: { razorpayPaymentId?: string; trackingNumber?: string }
): Promise<void> {
  await updateDoc(doc(db, ORDERS, id), {
    status,
    ...extra,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteOrder(id: string): Promise<void> {
  await deleteDoc(doc(db, ORDERS, id));
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function createUserDoc(
  uid: string,
  data: Omit<UserDoc, "id" | "createdAt">
): Promise<void> {
  await updateDoc(doc(db, USERS, uid), {
    ...data,
    createdAt: serverTimestamp(),
  }).catch(async () => {
    // doc doesn't exist yet — create it
    const { setDoc } = await import("firebase/firestore");
    await setDoc(doc(db, USERS, uid), {
      ...data,
      createdAt: serverTimestamp(),
    });
  });
}

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const snap = await getDoc(doc(db, USERS, uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as UserDoc;
}

export async function getAllAdmins(): Promise<UserDoc[]> {
  const q = query(collection(db, USERS), where("role", "==", "admin"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserDoc));
}

export async function setUserRole(
  uid: string,
  role: "customer" | "admin",
  adminRole?: AdminRole
): Promise<void> {
  await updateDoc(doc(db, USERS, uid), {
    role,
    ...(adminRole ? { adminRole } : {}),
    updatedAt: serverTimestamp(),
  });
}
