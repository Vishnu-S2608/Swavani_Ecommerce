"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const contactInfo = [
    { icon: MapPin, label: "Store Address", value: "123 Silk Bazaar, T. Nagar, Chennai, Tamil Nadu 600017" },
    { icon: Phone,  label: "Phone / WhatsApp", value: "+91 98765 43210" },
    { icon: Mail,   label: "Email",    value: "hello@houseofswavani.com" },
    { icon: Clock,  label: "Store Hours", value: "Mon–Sat: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Header */}
      <div className="bg-crimson-900 py-16 bg-indian-pattern text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-vibes text-3xl text-gold-400 mb-2"
        >
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-cormorant text-5xl font-bold text-ivory-100"
        >
          Contact Us
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-vibes text-2xl text-gold-500 mb-2">We&apos;d Love to Hear From You</p>
            <h2 className="font-cormorant text-3xl font-bold text-crimson-800 mb-4">Reach Out To Us</h2>
            <p className="font-outfit text-sm text-crimson-700/60 leading-relaxed mb-8">
              Whether you need styling advice, have a query about your order, or simply want to know more about our sarees — we&apos;re always here for you.
            </p>

            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 bg-crimson-700/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-crimson-700" />
                  </div>
                  <div>
                    <p className="text-xs text-gold-500 font-outfit uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm text-crimson-700 font-outfit whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-green-500 text-white font-outfit font-semibold text-sm rounded-full hover:bg-green-400 transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gold-400/10"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="text-6xl mb-4">🙏</div>
                <h3 className="font-cormorant text-2xl font-bold text-crimson-800 mb-2">Thank You!</h3>
                <p className="font-outfit text-sm text-crimson-700/60">
                  We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-cormorant text-2xl font-bold text-crimson-800 mb-6">Send a Message</h3>
                {[
                  { id: "name",    label: "Full Name",    type: "text",  placeholder: "Your name" },
                  { id: "email",   label: "Email Address",type: "email", placeholder: "your@email.com" },
                  { id: "subject", label: "Subject",      type: "text",  placeholder: "How can we help?" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-xs font-outfit font-medium text-crimson-700 mb-1.5 uppercase tracking-wider">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full px-4 py-3 border border-crimson-700/15 rounded-xl text-sm font-outfit text-crimson-700 placeholder-crimson-700/30 focus:outline-none focus:border-crimson-600 bg-ivory-100 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-xs font-outfit font-medium text-crimson-700 mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-crimson-700/15 rounded-xl text-sm font-outfit text-crimson-700 placeholder-crimson-700/30 focus:outline-none focus:border-crimson-600 bg-ivory-100 transition-colors resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-crimson-gradient text-ivory-100 font-outfit font-bold text-sm rounded-full btn-gold-shimmer transition-all hover:shadow-crimson"
                >
                  <Send size={16} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 h-64 rounded-2xl overflow-hidden bg-ivory-200 border border-gold-400/10 flex items-center justify-center"
        >
          <div className="text-center">
            <MapPin size={32} className="text-crimson-700/30 mx-auto mb-2" />
            <p className="font-outfit text-sm text-crimson-700/40">Interactive map — T. Nagar, Chennai</p>
            <p className="text-xs text-crimson-700/30 font-outfit mt-1">123 Silk Bazaar, Tamil Nadu 600017</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
