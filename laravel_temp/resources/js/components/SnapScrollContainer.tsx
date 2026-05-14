"use client";

import React, { useRef } from "react";
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from "framer-motion";
import BlockRenderer from "./BlockRenderer";
import TitleRevealOverlay from "./TitleRevealOverlay";

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
      className={`h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory transform origin-top-center no-scrollbar`}
      style={{
        // transform: `scale(${scaleX})`,
        // height: height,
        // width: width,
        backgroundColor: backgroundColor || "transparent",
        overflowX: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr",
        position: "relative",
      }}
    >
      {/* Title Reveal Overlay */}
      {isTitleReveal && sectionCount > 1 && (
        <TitleRevealOverlay isVisible={isAnimating} siteName={siteName} />
      )}

      {blocks.map((block, index) => (
        <div
          key={index}
          id={block.data?.id || `section-${index}`}
          className={`relative w-full ${index > 0 ? "sticky top-0" : ""}`}
        >
          <section
            className="h-[100dvh] w-full snap-center snap-always shrink-0 overflow-y-auto shadow-2xl no-scrollbar"
            style={{ zIndex: index + 1 }}
          >
            <div className="min-h-full w-full flow-root">
              <BlockRenderer blocks={[block]} />
            </div>
          </section>
        </div>
      ))}
    </main>
  );
}
