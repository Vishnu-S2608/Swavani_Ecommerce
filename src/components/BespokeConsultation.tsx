"use client";
import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function BespokeConsultation() {
  const [form, setForm] = useState({ name: "", phone: "", occasion: "", note: "" });
  const [sent, setSent] = useState(false);

  const occasions = ["Wedding", "Engagement", "Festival", "Office", "Gift", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Swavani! I'd like to book a consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nOccasion: ${form.occasion}\nNote: ${form.note}`
    );
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
    setSent(true);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { amount: 0.2, once: true });
  const rightInView = useInView(rightRef, { amount: 0.2, once: true });

  const perks = [
    { icon: "✦", text: "Private in-boutique or virtual saree consultation" },
    { icon: "◈", text: "Personalised colour &amp; weave recommendations" },
    { icon: "✿", text: "Complimentary petticoat &amp; blouse piece matching" },
    { icon: "❋", text: "Doorstep delivery with authenticity certificate" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        background: "linear-gradient(180deg, #EDDCC0 0%, #F4E8D4 100%)",
      }}
    >
      <div className="absolute inset-0 bg-kolam opacity-50 pointer-events-none" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Left info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -50 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div style={{ width: "36px", height: "1px", background: "#B8925A" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600 }}>
                VIP Experience
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              style={{
                fontFamily: "var(--font-cinzel), Georgia, serif",
                fontSize: "clamp(26px, 3.8vw, 42px)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#3A0615",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Bespoke Bridal<br />Trousseau Salon
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.28 }}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(16px, 2vw, 19px)",
                fontStyle: "italic",
                color: "#3A2A26",
                lineHeight: 1.7,
                marginBottom: "28px",
                opacity: 0.85,
              }}
            >
              Our silk curators offer private, by-appointment consultations for bridal trousseaux. We curate a personalised collection based on your ceremony, colour palette, and heirloom aspirations.
            </motion.p>

            {/* Perks */}
            <div className="space-y-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -24 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.38 + i * 0.1 }}
                >
                  <motion.span
                    style={{ color: "#B8925A", fontSize: "16px", flexShrink: 0, paddingTop: "2px" }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 3 + i, duration: 0.6 }}
                  >
                    {perk.icon}
                  </motion.span>
                  <p
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "12px",
                      letterSpacing: ".06em",
                      color: "#3A2A26",
                      lineHeight: 1.6,
                    }}
                    dangerouslySetInnerHTML={{ __html: perk.text }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={rightInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{
              background: "#FBF5EA",
              border: "1px solid rgba(184,146,90,.35)",
              padding: "clamp(28px, 4vw, 44px)",
              boxShadow: "0 20px 70px rgba(58,6,21,.12)",
              position: "relative",
            }}
          >
            {/* Gold top hairline */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />

            {sent ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  style={{ fontSize: "36px", marginBottom: "12px", color: "#B8925A" }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >✦</motion.div>
                <h3 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "18px", letterSpacing: ".1em", color: "#3A0615", textTransform: "uppercase", fontWeight: 600 }}>
                  Thank You
                </h3>
                <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "16px", fontStyle: "italic", color: "#3A2A26", marginTop: "8px", lineHeight: 1.6 }}>
                  We&apos;ve received your request and will reach out on WhatsApp within 24 hours to schedule your private consultation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Full Name *", key: "name" as const, placeholder: "Your name", type: "text", required: true },
                  { label: "WhatsApp Number *", key: "phone" as const, placeholder: "+91 XXXXX XXXXX", type: "tel", required: true },
                ].map((field, i) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  >
                    <label style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "9px", letterSpacing: ".22em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                      {field.label}
                    </label>
                    <input
                      required={field.required}
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        background: "#F4E8D4",
                        border: "1px solid rgba(184,146,90,.3)",
                        padding: "12px 14px",
                        fontSize: "13px",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        color: "#3A2A26",
                        outline: "none",
                        transition: "border-color .25s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#B8925A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(184,146,90,.3)")}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={rightInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <label style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "9px", letterSpacing: ".22em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                    Occasion
                  </label>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#F4E8D4",
                      border: "1px solid rgba(184,146,90,.3)",
                      padding: "12px 14px",
                      fontSize: "13px",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      color: "#3A2A26",
                      outline: "none",
                      appearance: "none",
                    }}
                  >
                    <option value="">Select occasion…</option>
                    {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={rightInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <label style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "9px", letterSpacing: ".22em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                    Note (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Tell us about your vision, preferred colours, or budget range…"
                    style={{
                      width: "100%",
                      background: "#F4E8D4",
                      border: "1px solid rgba(184,146,90,.3)",
                      padding: "12px 14px",
                      fontSize: "13px",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      color: "#3A2A26",
                      outline: "none",
                      resize: "vertical",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#B8925A")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(184,146,90,.3)")}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="btn-silk w-full justify-center"
                  style={{ textAlign: "center" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={rightInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Private Consultation via WhatsApp
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />
    </section>
  );
}
