import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Securely calculate total from database
    let total = 0;
    for (const item of items) {
      const productId = item.productId || item.id;
      const docSnap = await adminDb.collection("products").doc(productId).get();
      if (docSnap.exists) {
        const productData = docSnap.data();
        total += (productData?.price || 0) * (item.qty || 1);
      } else {
        return NextResponse.json({ error: `Product ${productId} not found` }, { status: 400 });
      }
    }

    // Add shipping cost (Free if >= 2999, else 150)
    const finalTotal = total + (total >= 2999 ? 0 : 150);

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: finalTotal * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      calculatedTotal: finalTotal,
    });
  } catch (error) {
    console.error("Razorpay create-order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
