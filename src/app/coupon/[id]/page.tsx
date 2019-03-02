"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useCoupons } from "@/hooks/use-coupons";
import { stores } from "@/data/placeholders";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ArrowUpSolid from "@/assets/arrowup.svg";
import { Copy, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatDiscountValue,
  getSpendThresholdLabel,
} from "@/lib/coupon-utils";
import { formatDate } from "@/lib/utils";
import CheckCircleSolid from "@/assets/check-circle.svg";

type TransitionState = "revealing" | "content" | "complete";
type Position = { x: number; y: number } | null;

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

function useRevealTransition(searchParams: ReturnType<typeof useSearchParams>) {
  const [transitionState, setTransitionState] =
    useState<TransitionState>("revealing");
  const [clickPosition, setClickPosition] = useState<Position>(null);
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const xParam = searchParams?.get("x");
    const yParam = searchParams?.get("y");
    const bgColorParam = searchParams?.get("backgroundColor");

    if (xParam && yParam) {
      const x = parseFloat(xParam);
      const y = parseFloat(yParam);
      if (!Number.isNaN(x) && !Number.isNaN(y)) {
        setClickPosition({ x, y });
      }
    }
    if (bgColorParam) {
      setBackgroundColor(decodeURIComponent(bgColorParam));
    }
    setMounted(true);
  }, [searchParams]);

  return {
    mounted,
    transitionState,
    setTransitionState,
    clickPosition,
    backgroundColor,
  };
}

export default function CouponDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { coupons } = useCoupons();
  const { resolvedTheme } = useTheme();

  const {
    mounted,
    transitionState,
    setTransitionState,
    clickPosition,
    backgroundColor,
  } = useRevealTransition(searchParams);

  const coupon = coupons.find((c) => c.id === params.id);
  const store = coupon ? stores.find((s) => s.id === coupon.storeId) : null;

  const isDark = resolvedTheme === "dark";
  const background =
    store?.colorPalette?.background?.[isDark ? 1 : 0] ??
    (isDark ? "#111827" : "#FFFFFF");
  const foreground =
    store?.colorPalette?.foreground?.[isDark ? 1 : 0] ?? "#FFFFFF";

  const maxDistance = getMaxDistance(clickPosition);

  const handleCopyCode = async () => {
    if (coupon?.code) {
      await navigator.clipboard.writeText(coupon.code);
    }
  };

  // Wait for hydration, coupon existence and store match just as home page
  if (!mounted || !coupon || !store) {
    return null;
  }

  const discountLabel = formatDiscountValue(coupon);
  const spendDisplay = getSpendThresholdLabel(coupon);
  const expiration = formatDate(coupon.expiration?.endDate);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Persistent background overlay after reveal */}
      {clickPosition && transitionState !== "revealing" && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: background,
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
              background: background,
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
            className="relative z-50 min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto"
            style={{
              backgroundColor: background,
              color: foreground,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            onAnimationComplete={() => setTransitionState("complete")}
          >
            <div className="w-full ">
              <div className="w-full space-y-4">
                <Badge
                  variant="outline"
                  className="py-2.5 px-4 border-foreground"
                >
                  one-time use
                </Badge>

                {/* Coupon main info: discount, spend, date */}
                <div className="w-full grid grid-cols-2 gap-6 items-center mb-2">
                  <div className="flex flex-col gap-4">
                    <div className="text-3xl font-bold leading-tight flex flex-row gap-1.5 transition-colors duration-150">
                      <span className="transition-colors duration-150">
                        {discountLabel}
                      </span>
                      <span className="transition-colors duration-150">
                        OFF
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                      <CalendarClock className="group-hover:text-background transition-colors duration-150" />
                      <span className="transition-colors duration-150">
                        {`Valid until (${expiration})`}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-end justify-end">
                    <div
                      className="text-sm font-semibold flex items-center gap-1 transition-colors duration-150"
                      style={{ color: foreground }}
                    >
                      <span className="transition-colors duration-150">
                        Min. Spend
                      </span>
                    </div>
                    <Badge className="rounded-full px-3 py-1 text-sm font-semibold">
                      <ArrowUpSolid className="size-4 transition-colors duration-150" />
                      {spendDisplay}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {coupon.discountDescription && (
              <p className="w-full opacity-60 py-6">
                {coupon.discountDescription}
              </p>
            )}

            <div className="space-y-6">
              <div className="w-full">
                <h3 className="font-semibold mb-4">Terms & Conditions</h3>
                <ul className="space-y-3">
                  {(coupon.termsAndConditions ?? []).map((term, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircleSolid className="size-5 flex-shrink-0" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="w-full border-t-2 border-dashed"
                style={{
                  borderColor: `${foreground ?? "#fff"}`,
                }}
              />

              <div className="w-full flex flex-col items-center space-y-3">
                <span
                  className="text-sm"
                  style={{
                    borderColor: `${foreground ?? "#fff"}40`,
                  }}
                >
                  Coupon code
                </span>
                <div
                  onClick={handleCopyCode}
                  className="w-full rounded-lg px-4 py-3 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  style={{
                    background: foreground ?? "#fff",
                  }}
                >
                  <Copy
                    style={{ color: background }}
                    strokeWidth={2}
                    className="w-4 h-4"
                  />
                  <span
                    className="font-mono font-semibold text-base tracking-wider"
                    style={{
                      color: backgroundColor || "#000000",
                    }}
                  >
                    {coupon.code}
                  </span>
                </div>
              </div>

              <div className="w-full flex justify-center mb-4 col-span-1 mx-auto">
                <p className="font-barcode text-[64px] tracking-[.1em]">
                  {coupon.code + coupon.code}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
