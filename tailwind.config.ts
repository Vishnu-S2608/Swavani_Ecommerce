import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Silk Core ── */
        "silk-deep":   "#3A0615",
        "silk":        "#5C0F27",
        "silk-light":  "#7D1A38",
        "silk-sheen":  "#A83A5A",

        /* ── Cream ── */
        "cream":       "#F4E8D4",
        "cream-warm":  "#EDDCC0",
        "ivory":       "#FBF5EA",

        /* ── Zari Gold ── */
        "zari":        "#B8925A",
        "zari-bright": "#D9B26D",
        "zari-glow":   "#F1D9A0",

        /* ── Text ── */
        "ink":         "#3A2A26",

        /* ── Accent colours (one per section) ── */
        "peacock":     "#0F5C63",
        "emerald":     "#1F6B4A",
        "saffron":     "#D98324",
        "indigo":      "#2B2F6B",
        "rose":        "#C24B6B",
      },

      fontFamily: {
        cinzel:      ["var(--font-cinzel)", "Georgia", "serif"],
        cormorant:   ["var(--font-cormorant)", "Georgia", "serif"],
        montserrat:  ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },

      backgroundImage: {
        "silk-gradient":  "linear-gradient(180deg, #7D1A38 0%, #5C0F27 45%, #3A0615 100%)",
        "zari-gradient":  "linear-gradient(100deg, #B8925A, #F1D9A0 45%, #B8925A)",
        "cream-gradient": "linear-gradient(180deg, #FBF5EA 0%, #F4E8D4 60%, #EDDCC0 100%)",
      },

      animation: {
        "marquee":      "marquee 25s linear infinite",
        "float":        "float 6s ease-in-out infinite",
        "shimmer":      "shimmer 3s linear infinite",
        "spin-slow":    "spin 20s linear infinite",
        "pulse-gold":   "pulse-gold 2s ease-in-out infinite",
        "fade-up":      "fade-up 0.8s ease-out forwards",
        "shine-sweep":  "shine-sweep 3s ease-in-out infinite",
        "zari-sweep":   "zari-sweep 3s linear infinite",
      },

      keyframes: {
        marquee:      { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float:        { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-16px)" } },
        shimmer:      { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "pulse-gold": {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(217,178,109,0)" },
          "50%": { boxShadow: "0 0 20px 8px rgba(217,178,109,.35)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "shine-sweep": {
          "0%":   { left: "-100%" },
          "50%":  { left: "150%" },
          "100%": { left: "150%" },
        },
        "zari-sweep": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      boxShadow: {
        "zari":       "0 4px 24px rgba(184,146,90,.28), 0 1px 4px rgba(184,146,90,.18)",
        "zari-hover": "0 8px 40px rgba(184,146,90,.42), 0 2px 8px rgba(184,146,90,.25)",
        "silk":       "0 4px 24px rgba(58,6,21,.28)",
        "silk-hover": "0 12px 48px rgba(58,6,21,.38)",
        "card":       "0 20px 60px rgba(58,6,21,.22), 0 6px 20px rgba(58,6,21,.12)",
        "card-hover": "0 36px 90px rgba(58,6,21,.34), 0 12px 36px rgba(184,146,90,.18)",
      },

      transitionTimingFunction: {
        "silk":   "cubic-bezier(.76,0,.2,1)",
        "spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};

export default config;
