import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR" } = await req.json();

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
