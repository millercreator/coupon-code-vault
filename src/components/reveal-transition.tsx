"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type TransitionState = "revealing" | "content" | "complete";
export type Position = { x: number; y: number } | null;

function getMaxDistance(clickPosition: Position) {
  if (!clickPosition) return 0;
  const { x, y } = clickPosition;
  const width = typeof window !== "undefined" ? window.innerWidth : 1920;
  const height = typeof window !== "undefined" ? window.innerHeight : 1080;
  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width, y: height },
  ];
  return Math.max(
    ...corners.map((corner) => Math.hypot(corner.x - x, corner.y - y))
  );
}

type RevealTransitionProps = {
  background: string;
  clickPosition: Position;
  children: React.ReactNode;
  onRevealCompleteAction?: () => void;
};

export function RevealTransition({
  background,
  clickPosition,
  children,
  onRevealCompleteAction,
}: RevealTransitionProps) {
  const [transitionState, setTransitionState] =
    useState<TransitionState>("revealing");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxDistance = getMaxDistance(clickPosition);

  // Wait for hydration
  if (!mounted) {
    return null;
  }

  const handleContentComplete = () => {
    setTransitionState("complete");
    onRevealCompleteAction?.();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Persistent background overlay after reveal */}
      {clickPosition && transitionState !== "revealing" && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background,
            clipPath: `circle(${maxDistance}px at ${clickPosition.x}px ${clickPosition.y}px)`,
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {transitionState === "revealing" && clickPosition && (
          <motion.div
            key="reveal"
            className="fixed inset-0 z-50"
            style={{
              background,
              clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)`,
            }}
            animate={{
              clipPath: `circle(${maxDistance}px at ${clickPosition.x}px ${clickPosition.y}px)`,
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            onAnimationComplete={() => setTransitionState("content")}
          />
        )}

        {(transitionState === "content" || transitionState === "complete") && (
          <motion.div
            key="content"
            className="relative z-50 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            onAnimationComplete={handleContentComplete}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
