"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useCoupons } from "@/hooks/use-coupons";
import { stores } from "@/data/placeholders";
import { useTheme } from "next-themes";
import { CalendarClock, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatDiscountValue,
  getSpendThresholdLabel,
} from "@/lib/coupon-utils";
import { formatDate } from "@/lib/utils";
import CheckCircleSolid from "@/assets/check-circle.svg";
import ArrowUpSolid from "@/assets/arrowup.svg";
import Footer from "@/components/footer";
import { RevealTransition, Position } from "@/components/reveal-transition";
import { CountdownTimer } from "@/components/countdown-timer"; // <-- Import CountdownTimer

export default function CouponDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { coupons } = useCoupons();
  const { resolvedTheme } = useTheme();

  const xRaw = searchParams?.get("x");
  const yRaw = searchParams?.get("y");
  const bgColorQuery = searchParams?.get("bg");

  const clickPosition: Position =
    xRaw && yRaw
      ? {
          x: Number(xRaw),
          y: Number(yRaw),
        }
      : null;

  const coupon = coupons.find((c) => c.id === params.id);
  const store = coupon ? stores.find((s) => s.id === coupon.storeId) : null;

  const isDarkMode = resolvedTheme === "dark";

  // Backwards compatibility: override color if present in query params
  const background =
    bgColorQuery ||
    store?.colorPalette?.background?.[isDarkMode ? 1 : 0] ||
    "var(--background)";
  const foreground =
    store?.colorPalette?.foreground?.[isDarkMode ? 1 : 0] ||
    "var(--foreground)";

  if (!coupon || !store) return null;

  const discountLabel = formatDiscountValue(coupon);
  const spendDisplay = getSpendThresholdLabel(coupon);
  const expiration = formatDate(coupon.expiration?.endDate);

  const handleCopyCode = async () => {
    if (!coupon?.code) return;
    await navigator.clipboard.writeText(coupon.code);
  };

  return (
    <RevealTransition background={background} clickPosition={clickPosition}>
      <div
        className="flex flex-col items-center justify-center p-6 min-h-screen mb-20"
        style={{
          backgroundColor: background,
          color: foreground,
        }}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="w-full space-y-4">
            <Badge
              variant="outline"
              className="py-2.5 px-4 text-sm border-foreground"
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
                  <span className="transition-colors duration-150">OFF</span>
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
                <Badge className="rounded-full px-3 py-1 text-base font-semibold">
                  <ArrowUpSolid className="size-4 transition-colors duration-150" />
                  {spendDisplay}
                </Badge>
              </div>
            </div>
          </div>

          {coupon.expiration?.endDate && (
            <div>
              <CountdownTimer
                endDate={coupon.expiration.endDate}
                className="ml-7 group-hover:text-background"
              />
            </div>
          )}

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
                    color: background || "#000000",
                  }}
                >
                  {coupon.code}
                </span>
              </div>
            </div>

            <div className="w-full flex justify-center mb-4 col-span-1 mx-auto">
              <p className="font-barcode text-[64px] tracking-[.1em]">
                {coupon.code}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </RevealTransition>
  );
}
