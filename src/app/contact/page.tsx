"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `*New Inquiry from ${form.name}*
*Email:* ${form.email}
*Subject:* ${form.subject}

*Message:*
${form.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/916381895890?text=${encodedText}`, "_blank");
    
    setSent(true);
  };

  const contactInfo = [
    { icon: MapPin, label: "Store Address", value: "15A Shanumuga puram, Thoothukudi - 628003" },
    { icon: Phone,  label: "Phone / WhatsApp", value: "+91 63818 95890" },
    { icon: Mail,   label: "Email",    value: "houseofswavani@gmail.com" },
    { icon: Clock,  label: "Store Hours", value: "Mon–Sat: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-[#F4E8D4] pt-24 pb-16">
      {/* Header */}
      <div className="py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-montserrat text-sm font-semibold tracking-[0.25em] text-[#96742A] uppercase mb-4"
        >
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-cinzel text-5xl md:text-6xl font-semibold text-[#3E040E]"
        >
          Visit Us
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-cormorant italic text-2xl text-[#96742A] mb-4">We'd Love to Hear From You</p>
            <h2 className="font-cinzel text-3xl font-semibold text-[#3E040E] mb-6">Reach Out To Us</h2>
            <p className="font-cormorant font-medium text-lg text-[#382E2E] leading-relaxed mb-12">
              Whether you need styling advice, have a query about your order, or simply want to know more about our sarees — we're always here for you.
            </p>

            <div className="space-y-8">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#EBDCC5] border border-[#96742A]/20 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon size={20} className="text-[#3E040E]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-xs text-[#96742A] font-montserrat font-bold uppercase tracking-widest mb-1.5">{label}</p>
                    <p className="text-base text-[#382E2E] font-montserrat font-medium whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#FBF9F6] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#96742A]/20"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="text-6xl mb-6">✨</div>
                <h3 className="font-cinzel text-3xl font-semibold text-[#3E040E] mb-4">Thank You!</h3>
                <p className="font-cormorant text-xl text-[#382E2E]">
                  We've received your message and will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-cinzel text-3xl font-semibold text-[#3E040E] mb-8 text-center">Send a Message</h3>
                {[
                  { id: "name",    label: "Full Name",    type: "text",  placeholder: "Your name" },
                  { id: "email",   label: "Email Address",type: "email", placeholder: "your@email.com" },
                  { id: "subject", label: "Subject",      type: "text",  placeholder: "How can we help?" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-[10px] font-montserrat font-bold text-[#96742A] mb-2 uppercase tracking-widest">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full px-5 py-4 border-b border-[#96742A]/30 bg-transparent text-sm font-cormorant text-[#382E2E] placeholder-[#382E2E]/30 focus:outline-none focus:border-[#3E040E] transition-colors rounded-none"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-[10px] font-montserrat font-bold text-[#96742A] mb-2 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-5 py-4 border-b border-[#96742A]/30 bg-transparent text-sm font-cormorant text-[#382E2E] placeholder-[#382E2E]/30 focus:outline-none focus:border-[#3E040E] transition-colors resize-none rounded-none"
                  />
                </div>
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#EBDCC5] text-[#3E040E] border border-[#96742A]/30 font-montserrat font-bold text-xs tracking-widest uppercase rounded-full hover:bg-[#D9B26D] hover:text-[#1A050A] transition-all shadow-sm"
                  >
                    <Send size={16} />
                    Submit Inquiry
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 h-80 rounded-3xl overflow-hidden bg-[#EBDCC5] border border-[#96742A]/20 flex items-center justify-center shadow-inner"
        >
          <div className="text-center">
            <MapPin size={40} className="text-[#96742A]/60 mx-auto mb-4" />
            <p className="font-montserrat font-semibold tracking-widest text-xs text-[#3E040E]/60 uppercase">Interactive map — Thoothukudi</p>
            <p className="text-xl text-[#382E2E]/80 font-cormorant font-medium mt-2">15A Shanumuga puram, Thoothukudi - 628003</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
