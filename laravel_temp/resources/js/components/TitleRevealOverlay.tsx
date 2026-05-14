"use client";
import { motion, AnimatePresence } from "framer-motion";

interface TitleRevealOverlayProps {
  isVisible: boolean;
  siteName: string;
}

export default function TitleRevealOverlay({ isVisible, siteName }: TitleRevealOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && siteName && (
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
                <rect width="100%" height="100%" fill="white" />
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
  );
}
