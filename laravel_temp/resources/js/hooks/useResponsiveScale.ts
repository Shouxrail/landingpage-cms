"use client";

import { useState, useEffect } from "react";

export function useResponsiveScale(designWidth = 1536, threshold = 768) {
  const [state, setState] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    scale: 1,
    isDesktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate scale relative to design width
      const scale = width / designWidth;
      
      // Decision: Are we in desktop mode?
      // Instead of just width, we check if the window width is at least the threshold.
      // Or we could check scale > 0.5.
      const isDesktop = width >= threshold;

      setState({
        width,
        height,
        scale,
        isDesktop,
      });

      // Apply classes to document element for Tailwind variant
      if (isDesktop) {
        document.documentElement.classList.add("is-desktop");
        document.documentElement.classList.remove("is-mobile");
        
        // Font sizing scale: 16px at designWidth (e.g., 1536px)
        // This makes 1rem = 16px * scale.
        document.documentElement.style.fontSize = `${scale * 16}px`;
      } else {
        document.documentElement.classList.remove("is-desktop");
        document.documentElement.classList.add("is-mobile");
        
        // Reset to default on mobile
        document.documentElement.style.fontSize = "16px";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [designWidth, threshold]);

  return state;
}
