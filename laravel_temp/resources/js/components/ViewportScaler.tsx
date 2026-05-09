"use client";
import React, { useEffect, useState, useRef } from 'react';

interface ViewportScalerProps {
  children: React.ReactNode;
  baseWidth?: number;
  simulatedWidth?: number;
}

export default function ViewportScaler({ children, baseWidth = 1440, simulatedWidth }: ViewportScalerProps) {
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const width = simulatedWidth ?? window.innerWidth;
      const newScale = width < baseWidth ? width / baseWidth : 1;
      setScale(newScale);

      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
    };

    // Initial update
    update();

    // Additional update after a short delay to catch images/fonts rendering
    const timer = setTimeout(update, 500);

    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        const height = contentRef.current.offsetHeight;
        if (height > 0) setContentHeight(height);
      }
    });

    if (contentRef.current) resizeObserver.observe(contentRef.current);

    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [baseWidth, simulatedWidth]);

  // SSG fallback or initial mount
  if (!mounted) return <div className="w-full h-screen bg-transparent">{children}</div>;

  return (
    <div
      className="w-full overflow-x-hidden relative"
      style={{
        // If contentHeight is null, don't restrict height to avoid blank screen
        height: contentHeight !== null ? `${contentHeight * scale}px` : 'auto',
        minHeight: '100vh',
        transition: 'height 0.2s ease-out'
      }}
    >
      <div
        ref={contentRef}
        className={scale < 1 ? "absolute top-0 left-0" : "relative"}
        style={{
          width: scale < 1 ? `${baseWidth}px` : '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
