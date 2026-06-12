"use client";

import { useState, useEffect } from "react";

export function useResponsiveScale(designWidth = 1536, threshold = 768, mobileDesignWidth = 480) {
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
      const isEditor = window.location.pathname.includes("/admin/editor");
      
      const isDesktop = width >= height;
      const scale = isDesktop ? width / designWidth : width / mobileDesignWidth;

      setState({
        width,
        height,
        scale,
        isDesktop,
      });

      // Only apply global root classes if NOT in the editor
      // In the editor, components should rely on the classes applied by the Editor wrapper
      if (!isEditor) {
        if (isDesktop) {
          document.documentElement.classList.add("is-desktop");
          document.documentElement.classList.remove("is-mobile");
        } else {
          document.documentElement.classList.remove("is-desktop");
          document.documentElement.classList.add("is-mobile");
        }
        document.documentElement.style.fontSize = `${scale * 16}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [designWidth, mobileDesignWidth]);

  return state;
}
