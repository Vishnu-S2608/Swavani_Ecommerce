"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from "lucide-react";

import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/data";

const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/15A,+Shanmugapuram,+Thoothukudi,+Tamil+Nadu+628001/@8.798323,78.1488893,819m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3b03efa3bc372999:0x86c0ce06c5f53177!8m2!3d8.798323!4d78.1488893!16s%2Fg%2F11gg_vgsv8?entry=ttu";

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
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, "_blank");
    
    setSent(true);
  };

  const contactInfo = [
    { icon: MapPin, label: "Store Address", value: "15A Shanmugapuram, Thoothukudi - 628001" },
    { icon: Phone,  label: "Phone / WhatsApp", value: WHATSAPP_DISPLAY },
    { icon: Mail,   label: "Email",    value: "houseofswavani@gmail.com" },
    { icon: Clock,  label: "Store Hours", value: "Mon–Sat: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-[#F4E8D4] pt-20 sm:pt-28 pb-12 sm:pb-16 font-montserrat">
      {/* Header */}
      <div className="py-8 sm:py-16 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-montserrat text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#96742A] uppercase mb-2 sm:mb-4"
        >
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-semibold text-[#3E040E]"
        >
          Visit Us
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-cormorant italic text-2xl text-[#96742A] mb-4">We&apos;d Love to Hear From You</p>
            <h2 className="font-cinzel text-3xl font-semibold text-[#3E040E] mb-6">Reach Out To Us</h2>
            <p className="font-cormorant font-medium text-lg text-[#382E2E] leading-relaxed mb-12">
              Whether you need styling advice, have a query about your order, or simply want to know more about our sarees — we&apos;re always here for you.
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
            className="bg-[#FBF9F6] rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl border border-[#96742A]/20"
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
                  We&apos;ve received your message and will get back to you shortly.
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

        {/* Interactive Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl overflow-hidden bg-[#FBF9F6] border border-[#96742A]/20 shadow-xl"
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#96742A]/15 bg-[#EBDCC5]/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className="text-[#96742A]" />
                <p className="text-xs font-montserrat font-bold text-[#96742A] uppercase tracking-widest">Store Location</p>
              </div>
              <h3 className="font-cinzel text-xl md:text-2xl font-semibold text-[#3E040E]">House of Swavani Boutique</h3>
              <p className="text-sm font-montserrat text-[#382E2E]/80 mt-1">15A, Shanmugapuram, Thoothukudi, Tamil Nadu 628001</p>
            </div>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3E040E] text-[#D9B26D] font-montserrat font-semibold text-xs uppercase tracking-widest hover:bg-[#5C0F27] transition-all shadow-md self-start md:self-auto"
            >
              <span>Get Directions</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="w-full h-80 md:h-[450px] relative bg-[#EBDCC5]/20">
            <iframe
              title="House of Swavani Google Map"
              src="https://maps.google.com/maps?q=8.798323,78.1488893&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
