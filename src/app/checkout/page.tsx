"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShieldCheck, Loader2, ArrowLeft, CreditCard, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createOrder, OrderDoc } from "@/lib/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

declare global {
  interface Window {
    Razorpay: any;
  }
}


export default function CheckoutPage() {
  const { total, items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pdfData, setPdfData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Restore success state from session storage on refresh
  useEffect(() => {
    const savedOrder = sessionStorage.getItem("swavani_last_order");
    if (savedOrder) {
      try {
        const data = JSON.parse(savedOrder);
        setPdfData(data);
        setSuccess(true);
      } catch(e) {}
    }
  }, []);

  // Auto-redirect if cart empty
  useEffect(() => {
    const savedOrder = sessionStorage.getItem("swavani_last_order");
    if (items.length === 0 && !success && !savedOrder) {
      router.push("/cart");
    }
  }, [items, success, router]);

  const finalTotal = total + (total >= 2999 ? 0 : 150);
  const shippingCost = total >= 2999 ? 0 : 150;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Load Razorpay script
      const scriptUrl = "https://checkout.razorpay.com/v1/checkout.js";
      const isLoaded = await new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 2. Call our secure API to create an order
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const orderData = await response.json();

      if (orderData.error) throw new Error(orderData.error);

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Swavani Store",
        description: "Elegant Saree Collection",
        image: "/logo.png",
        order_id: orderData.id,
        handler: async function (response: any) {
          // 4. On success, verify payment and create the order securely on server
          try {
            const orderData = {
              userId: "anonymous", 
              userEmail: formData.email,
              userName: formData.name,
              items: items.map(item => ({
                productId: item.id,
                name: item.name,
                qty: item.qty,
                price: item.price,
                imageUrl: item.image,
              })),
              subtotal: total,
              shipping: shippingCost,
              total: finalTotal,
              shippingAddress: {
                name: formData.name,
                phone: formData.phone,
                line1: formData.line1,
                line2: formData.line2,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
              },
            };

            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderData,
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.error) throw new Error(verifyData.error);
            
            const id = verifyData.orderId;
            
            const pData = {
              orderId: id,
              orderDate: new Date().toISOString(),
              formData,
              items: items.map(item => ({...item})), // snapshot
              total,
              shippingCost,
              finalTotal
            };
            
            sessionStorage.setItem("swavani_last_order", JSON.stringify(pData));
            setPdfData(pData);
            setSuccess(true);
            clearCart();
          } catch (err) {
            console.error("Firestore Order creation failed:", err);
            alert("Payment successful but order creation failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3E040E",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Removed buggy useEffect that caused infinite loop on clearCart

  const generatePDF = () => {
    if (!pdfData) return;
    const { orderId, orderDate, formData, items: pdfItems, total: pdfTotal, shippingCost: pdfShipping, finalTotal: pdfFinal } = pdfData;
    const doc = new jsPDF();
    
    // Header & Logo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(62, 4, 14); 
    doc.text("SWAVANI", 105, 20, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("The Elegant Saree Collection", 105, 28, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(200);
    doc.line(14, 35, 196, 35);

    // Bill Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("INVOICE", 14, 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Order ID: #${orderId.slice(0,8).toUpperCase()}`, 14, 56);
    doc.text(`Date: ${new Date(orderDate).toLocaleDateString('en-IN')}`, 14, 62);
    
    // Billing / Shipping Address
    doc.setFont("helvetica", "bold");
    doc.text("Billed To:", 120, 48);
    doc.setFont("helvetica", "normal");
    doc.text(formData.name, 120, 56);
    doc.text(`Phone: ${formData.phone}`, 120, 62);
    doc.text(`Email: ${formData.email}`, 120, 68);
    doc.text(formData.line1, 120, 74);
    if(formData.line2) doc.text(formData.line2, 120, 80);
    doc.text(`${formData.city}, ${formData.state} - ${formData.pincode}`, 120, formData.line2 ? 86 : 80);

    // Items Table
    const tableData = pdfItems.map((item: any) => [
      item.name,
      item.qty.toString(),
      `Rs. ${item.price.toLocaleString("en-IN")}`,
      `Rs. ${(item.price * item.qty).toLocaleString("en-IN")}`
    ]);

    autoTable(doc, {
      startY: 100,
      head: [['Item Description', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [62, 4, 14] }, 
      styles: { font: "helvetica", fontSize: 10 },
      margin: { top: 100 }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 120;

    // Totals
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", 140, finalY + 10);
    doc.setFont("helvetica", "normal");
    doc.text(`Rs. ${pdfTotal.toLocaleString("en-IN")}`, 170, finalY + 10);

    doc.setFont("helvetica", "bold");
    doc.text("Shipping:", 140, finalY + 18);
    doc.setFont("helvetica", "normal");
    doc.text(`Rs. ${pdfShipping}`, 170, finalY + 18);

    doc.setLineWidth(0.5);
    doc.line(140, finalY + 22, 196, finalY + 22);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Amount:", 140, finalY + 30);
    doc.text(`Rs. ${pdfFinal.toLocaleString("en-IN")}`, 170, finalY + 30);

    // Footer message
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Thank you for shopping with Swavani!", 105, 280, { align: "center" });

    // Save the PDF manually using Blob to ensure correct filename and format
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Swavani_Bill_${orderId.slice(0,8).toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReturnHome = () => {
    sessionStorage.removeItem("swavani_last_order");
    router.push("/");
  };

  if (success && pdfData) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] flex flex-col items-center justify-center p-6 text-center pt-24">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-[#2A3B24]/10 text-[#2A3B24] rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="font-cinzel text-4xl font-bold text-[#3E040E] mb-2 uppercase tracking-widest">Order Placed!</h1>
        <p className="font-montserrat text-[#382E2E]/80 mb-6 max-w-md font-semibold">
          Your order #{pdfData.orderId.slice(0,8).toUpperCase()} has been confirmed.
        </p>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#96742A]/30 max-w-md w-full mb-8 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Download size={100} />
          </div>
          <p className="text-sm text-[#2A3B24] font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 size={16} /> Bill Saved
          </p>
          <p className="text-xs text-[#382E2E]/70 font-medium leading-relaxed mb-6">
            You can download your PDF bill now. If you accidentally refresh the page, your bill is temporarily saved in your browser so you won't lose it!
          </p>
          <button 
            onClick={generatePDF}
            className="w-full py-4 bg-[#96742A] text-white font-bold text-xs uppercase tracking-[0.1em] rounded-xl hover:bg-[#7a5e20] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#96742A]/20"
          >
            <Download size={18} /> Download PDF Bill
          </button>
        </div>

        <button 
          onClick={handleReturnHome}
          className="px-8 py-3 bg-[#3E040E] text-[#FBF9F6] font-montserrat font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-black transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] py-20 px-4 sm:px-6 font-montserrat pt-32">
      <div className="max-w-6xl mx-auto">
        <Link href="/cart" className="inline-flex items-center gap-2 text-[#382E2E]/60 hover:text-[#96742A] mb-8 transition-colors text-sm font-semibold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <form onSubmit={handlePayment} className="grid lg:grid-cols-[1fr_400px] gap-8">
          
          {/* Left Col: Delivery Details */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#96742A]/20 p-6 sm:p-8">
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#96742A]/10">
               <div className="w-10 h-10 bg-[#96742A]/10 rounded-full flex items-center justify-center text-[#96742A]">
                 <MapPin size={20} />
               </div>
               <h2 className="font-cinzel text-2xl font-semibold uppercase tracking-widest text-[#3E040E]">Delivery Details</h2>
             </div>

             <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">Full Name *</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Jane Doe" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">Mobile Number *</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
                </div>
             </div>

             <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">Email Address *</label>
                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="jane@example.com" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
             </div>

             <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">Address Line 1 *</label>
                <input required name="line1" value={formData.line1} onChange={handleInputChange} type="text" placeholder="Flat / House No, Building, Street" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
             </div>
             
             <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">Address Line 2</label>
                <input name="line2" value={formData.line2} onChange={handleInputChange} type="text" placeholder="Landmark, Area (Optional)" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">City *</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="Mumbai" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">State *</label>
                  <input required name="state" value={formData.state} onChange={handleInputChange} type="text" placeholder="Maharashtra" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#382E2E]/70 mb-2">Pincode *</label>
                  <input required name="pincode" value={formData.pincode} onChange={handleInputChange} type="text" placeholder="400001" className="w-full px-4 py-3 border border-[#96742A]/20 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-medium text-sm focus:outline-none focus:border-[#96742A]" />
                </div>
             </div>
          </div>

          {/* Right Col: Payment Summary & Razorpay */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[#96742A]/20 flex flex-col h-fit sticky top-32">
            <div className="bg-[#3E040E] p-6 sm:p-8 text-[#FBF9F6] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <ShieldCheck size={120} />
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-semibold mb-2 uppercase tracking-widest">Secure Payment</h2>
              <p className="text-[#FBF9F6]/70 text-xs tracking-wider">Powered by Razorpay™</p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#96742A]/10">
                <div>
                  <p className="text-[#382E2E]/50 text-xs font-bold uppercase tracking-widest mb-1">Amount to pay</p>
                  <p className="font-cinzel text-3xl font-bold text-[#3E040E]">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#382E2E]/50 text-xs font-bold uppercase tracking-widest">{items.length} items</p>
                </div>
              </div>

              {/* Payment Checkout Action */}
              <div className="space-y-6">
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#3E040E] text-[#FBF9F6] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Proceed to Pay ₹${finalTotal.toLocaleString("en-IN")}`
                    )}
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 mt-4 text-[#382E2E]/40 text-[9px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={12} />
                    <span>256-bit SSL encrypted & secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
