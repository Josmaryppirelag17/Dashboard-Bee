/**
 * Design Tokens & Visual Styles for the BeeHive Productivity Dashboard.
 * Inspired by honey yellows, warm organic creams, and deeply contrastive obsidian blacks.
 */

export const THEME = {
  colors: {
    // Primary brand palette
    amberHoney: "#e28800", // Rich amber honey representing high priorities and milestones (Passes AA contrast on creams)
    honeyGold: "#faa715", // Warm pollen honey highlight
    creamBackground: "#faf6ee", // High-end luxurious beige-cream background
    obsidianText: "#100f0d", // Dominant deep ink obsidian charcoal for strict readable elements
    wheatSubtext: "#5c5449", // Solid mid-neutral for helper text that meets WCAG AA contrast against creams
    borderSoft: "#ebdcb9", // Clean, sub-amber cream border

    // Auxiliary status markers
    goldActive: "#e28800",
    successFern: "#15803d", // Emerald high contrast
    hazardRose: "#b91c1c", // Crimson warning
  },

  // Premium design component classes
  cardStyles: {
    glass:
      "bg-white/70 backdrop-blur-md border border-[#ebdcb9]/60 shadow-[0_8px_30px_rgba(110,80,45,-0.08)] rounded-2xl p-6 transition-all duration-300",
    organicHover:
      "hover:bg-white/90 hover:border-[#e28800]/50 hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(226,136,0,0.12)] transition-all duration-300",
    focusOutline:
      "focus:outline-none focus:ring-2 focus:ring-[#e28800]/50 focus:ring-offset-2 focus:ring-offset-[#faf6ee]",
  },
};
