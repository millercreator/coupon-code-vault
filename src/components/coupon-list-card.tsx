import { Info, CalendarClock } from "lucide-react";
import type { Coupon } from "@/lib/types";
import ArrowUpSolid from "@/assets/arrowup.svg";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { stores } from "@/data/placeholders";
import { formatDate } from "@/lib/utils";
import {
  formatDiscountValue,
  getSpendThresholdLabel,
} from "@/lib/coupon-utils";
import { CountdownTimer } from "./countdown-timer";

type CouponListCardProps = {
  coupon: Coupon;
};

export function CouponListCard({ coupon }: CouponListCardProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const discountLabel = formatDiscountValue(coupon);
  const spendDisplay = getSpendThresholdLabel(coupon);
  const expiration = formatDate(coupon.expiration?.endDate);

  const store = stores.find((s) => s.id === coupon.storeId);
  const isDarkMode = resolvedTheme === "dark";
  const backgroundColor = store?.colorPalette?.background[isDarkMode ? 1 : 0];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Capture click position relative to viewport
    const x = e.clientX;
    const y = e.clientY;

    const params = new URLSearchParams();
    params.set("x", String(x));
    params.set("y", String(y));
    if (backgroundColor) {
      params.set("backgroundColor", encodeURIComponent(backgroundColor));
    }

    // Navigate to detail page with search params
    router.push(`/coupon/${coupon.id}?${params.toString()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group px-6 py-6 w-full flex flex-col gap-y-4 overflow-hidden md:flex-row md:items-start md:gap-8 transition-colors duration-150 
      hover:bg-foreground hover:text-background cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="bg-background rounded-full size-10 absolute -left-5 top-1/2 -translate-y-1/2"></div>
        <div className="bg-background rounded-full size-10 absolute -right-5 top-1/2 -translate-y-1/2"></div>
      </div>
      <div className="flex items-center justify-between gap-4 md:flex-col md:items-start md:justify-center md:gap-2 md:w-auto">
        <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-2">
          <div className="text-2xl font-bold leading-tight flex flex-row gap-1.5 md:flex-col md:gap-0 transition-colors duration-150">
            <span className="transition-colors duration-150">
              {discountLabel}
            </span>
            <span className="transition-colors duration-150">OFF</span>
          </div>
          {spendDisplay ? (
            <div className="text-orange-400 text-sm font-semibold flex items-center gap-1 transition-colors duration-150">
              <ArrowUpSolid className="size-4 transition-colors duration-150" />
              <span className="transition-colors duration-150">
                {spendDisplay}
              </span>
            </div>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {}}
          className="h-7 w-7 p-1 md:hidden"
          aria-label="Menu"
        >
          <Info className="group-hover:text-background transition-colors duration-150" />
        </Button>
      </div>

      <div className="space-y-4 flex-auto w-full md:flex md:flex-col md:gap-0">
        <div className="flex w-full justify-between gap-4">
          <p className="text-sm md:max-w-sm leading-5 line-clamp-2 transition-colors duration-150">
            {coupon.discountDescription}
          </p>

          <div className="hidden md:block">
            <Info className="group-hover:text-background transition-colors duration-150" />
          </div>
        </div>
        <div className="flex w-full justify-between md:items-center">
          <div className="flex w-full items-center gap-2">
            <div className="flex gap-2 items-center text-sm">
              <CalendarClock className="group-hover:text-background transition-colors duration-150" />
              <span className="transition-colors duration-150">
                {expiration}
              </span>
            </div>
            <span className="text-[10px]">•</span>
            {coupon.expiration?.endDate && (
              <div className="">
                <CountdownTimer
                  endDate={coupon.expiration.endDate}
                  className="group-hover:text-background"
                />
              </div>
            )}
          </div>
          <Badge
            variant="secondary"
            className="rounded-full py-2 px-3.5 cursor-pointer select-all transition-colors duration-150 tracking-widest"
            aria-label="Coupon code"
          >
            {coupon.code}
          </Badge>
        </div>
      </div>
    </div>
  );
}
