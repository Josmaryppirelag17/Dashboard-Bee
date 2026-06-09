/**
 * Design System Tokens & Style Dictionary for the BeeHive Productivity Dashboard.
 *
 * Provides a single source of truth (Branding, Palette, Spacing, Transitions, and Component classes)
 * following structural design principles to guarantee consistency, interoperability, and visual quality.
 */

export const THEME_CONFIG = {
  // Raw Hex colors for canvas renders, dynamic SVGs, and chart overlays
  colors: {
    amberHoney: "#e28800", // Main honey color (Passes AA contrast on creams)
    honeyGold: "#faa715", // Warm mid-level yellow highlights
    creamBackground: "#faf6ee", // Light organic beige base
    obsidianText: "#100f0d", // Dominant ink charcoal for deep readable text
    wheatSubtext: "#5c5449", // Solid neutral secondary text meeting WCAG AA
    borderSoft: "#ebdcb9", // Delicate golden border
    borderMuted: "#ebdcb9/50", // Translucent borders for grids
    pollenYellow: "#f5eedd", // Passive hexagon fill backdrops
    successFern: "#15803d", // Success emerald accent
    hazardRose: "#b91c1c", // Hazard notification warning rouge
    amberGlow: "rgba(226, 136, 0, 0.12)", // Ambient glow backdrop
  },

  // Tailwind CSS Semantic Layouts & Component Tokens
  layouts: {
    appBackground: "bg-[#faf6ee] text-[#100f0d] font-sans antialiased",
    navbar: "h-[72px] bg-white/70 backdrop-blur-md border-b border-[#ebdcb9]/60",
    sidebar: "bg-[#f9f5ec] border-r border-[#ebdcb9] shadow-[4px_0_24px_rgba(110,80,45,0.02)]",
    scrollbar: "custom-scrollbar",
  },

  // Component styles (Atoms, Molecules, Organisms presets)
  components: {
    // Elegant glassmorphism panel styling
    glassCard:
      "bg-white/75 backdrop-blur-md border border-[#ebdcb9]/60 shadow-[0_10px_35px_rgba(110,80,45,0.04)] rounded-3xl p-6 transition-all duration-300",

    // Smooth transitions for hover interactive controls
    hoverTransition: "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",

    // Organic elevations and brand colors on interaction
    cardInteractive:
      "hover:bg-white/90 hover:border-[#e28800]/50 hover:translate-y-[-2px] hover:shadow-[0_12px_45px_rgba(226,136,0,0.1)]",

    // WCAG accessibility compliant standard focus ring styles
    focusRing:
      "focus:outline-none focus:ring-2 focus:ring-[#e28800]/50 focus:ring-offset-2 focus:ring-offset-[#faf6ee]",

    // Button standard states
    primaryButton:
      "bg-gradient-to-r from-amber-500 to-[#faa715] text-[#100f0d] font-bold rounded-xl text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(226,136,0,0.18)] hover:shadow-[0_4px_25px_rgba(226,136,0,0.3)] hover:scale-[1.01]",
    secondaryButton:
      "bg-white hover:bg-stone-50 border border-[#ebdcb9] text-[#5c5449] hover:text-[#100f0d] font-bold rounded-xl text-xs uppercase tracking-wider",
  },

  // Preset motion animation duration settings mapped to framer-motion setups
  motion: {
    duration: 0.35,
    easeSpring: [0.16, 1, 0.3, 1] as [number, number, number, number],
    hoverScale: 1.015,
    clickScale: 0.985,
  },
};

// Maintain compatibility with existing legacy references if they are hit
export const THEME = {
  colors: THEME_CONFIG.colors,
  cardStyles: {
    glass: THEME_CONFIG.components.glassCard,
    organicHover: THEME_CONFIG.components.cardInteractive,
    focusOutline: THEME_CONFIG.components.focusRing,
  },
};
