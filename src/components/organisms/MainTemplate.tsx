"use client";

import React from "react";
import { THEME_CONFIG } from "@/theme.config";

interface MainTemplateProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

/**
 * Template: MainTemplate
 *
 * DESIGN ARCHITECTURE BRIEF (Staff Frontend Engineer):
 * - SRP: Exclusively arranges page boundaries and grids.
 * - Flex Layout slots allow structural components to be swapped instantly for testing.
 */
export const MainTemplate: React.FC<MainTemplateProps> = ({ sidebar, header, children, id }) => {
  return (
    <div
      id={id}
      className={`flex h-screen w-screen overflow-hidden ${THEME_CONFIG.layouts.appBackground}`}
    >
      {/* Sidebar Slot Area */}
      {sidebar}

      {/* Main Structural Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Slot Area */}
        {header}

        {/* Scrollable Main Content Frame */}
        <main
          id="main-content"
          className={`flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 bg-[#faf6ee] relative ${THEME_CONFIG.layouts.scrollbar}`}
        >
          {/* Decorative Honey Background Halo */}
          <div
            className="absolute top-[10%] right-[12%] w-[450px] h-[450px] bg-[#e28800]/3 rounded-full filter blur-[120px] pointer-events-none z-0"
            aria-hidden="true"
          />

          {/* Main Stage Child Container */}
          <div className="relative z-10 max-w-7xl mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default MainTemplate;
