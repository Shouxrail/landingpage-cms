"use client";

import React, { useRef } from "react";
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from "framer-motion";
import BlockRenderer from "./BlockRenderer";

interface SnapScrollContainerProps {
  blocks: any[];
  siteName: any;
  isTitleReveal: boolean;
  backgroundColor: any;
}

export default function SnapScrollContainer({
  blocks,
  siteName,
  isTitleReveal,
  backgroundColor,
}: SnapScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Calculate progress specifically for the first transition (0 to 1)
  // If there are N blocks, the first transition is from 0 to 1/(N-1) of the scroll range
  const sectionCount = blocks.length;
  const firstTransitionEnd = sectionCount > 1 ? 1 / (sectionCount - 1) : 1;

  const [isAnimating, setIsAnimating] = React.useState(false);

  // Trigger animation based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only trigger between section 0 and 1
    const isInTransitionZone = latest > 0.01 && latest < firstTransitionEnd - 0.01;
    if (isInTransitionZone !== isAnimating) {
      setIsAnimating(isInTransitionZone);
    }
  });

  return (
    <main
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      style={{
        backgroundColor: backgroundColor || "transparent",
        overflowX: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr",
        position: "relative",
      }}
    >
      {/* Title Reveal Overlay */}
      <AnimatePresence>
        {isTitleReveal && sectionCount > 1 && siteName && isAnimating && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[100] pointer-events-none"
          >
            <svg className="w-full h-full">
              <defs>
                <mask id="textMask">
                  {/* The white rect makes everything visible (the black background) */}
                  <rect width="100%" height="100%" fill="white" />
                  {/* The motion.text creates the "hole" (black in a mask = transparent) */}
                  <motion.text
                    initial={{ scale: 20 }}
                    animate={{ scale: 0.5 }}
                    exit={{ scale: 1.5 }}
                    transition={{ duration: 0.21, ease: "easeInOut" }}
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-5xl md:text-8xl font-black uppercase"
                    style={{ fill: "black", fontWeight: 900 }}
                  >
                    {siteName}
                  </motion.text>
                </mask>
              </defs>

              {/* This is your actual background. It's cut by the mask above. */}
              <rect
                width="100%"
                height="100%"
                fill="black"
                mask="url(#textMask)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <AnimatePresence>
        {isTitleReveal && sectionCount > 1 && siteName && isAnimating && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-white"
            style={{ mixBlendMode: "lighten" }}
          >
            <motion.div
              initial={{ scale: 20 }}
              animate={{ scale: 0.5 }}
              exit={{ scale: 1.5 }}
              transition={{ duration: 0.21, ease: "easeInOut" }}
              className="text-black text-5xl md:text-8xl font-black uppercase text-center px-6"
              style={{ mixBlendMode: "multiply" }}
            >
              {siteName}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {blocks.map((block, index) => (
        <div
          key={index}
          id={block.data?.id || `section-${index}`}
          className={`relative h-screen w-full ${index > 0 ? "sticky top-0" : ""}`}
        >
          <section
            className="h-screen w-full snap-center snap-always shrink-0 overflow-hidden shadow-2xl"
            style={{ zIndex: index + 1 }}
          >
            <div className="h-screen w-full">
              <BlockRenderer blocks={[block]} />
            </div>
          </section>
        </div>
      ))}
    </main>
  );
}
