import { Expand, CalendarClock } from "lucide-react";
import type { Coupon } from "@/lib/types";
import ArrowUpSolid from "@/assets/arrowup.svg";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type CouponListCardProps = {
  coupon: Coupon;
};

export function CouponListCard({ coupon }: CouponListCardProps) {
  const discountLabel = getDiscountLabel(coupon);
  const spendDisplay = getSuggestedSpendLabel(coupon);
  const expiration = formatExpirationDate(coupon.expiration?.endDate);

  return (
    <div
      className="relative group px-6 py-4 w-full flex flex-col gap-y-4 overflow-hidden md:flex-row md:items-start md:gap-8 transition-colors duration-150 
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
            <div className="text-orange-400 text-sm flex items-center gap-1 transition-colors duration-150">
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
          <Expand className="group-hover:text-background transition-colors duration-150" />
        </Button>
      </div>

      <div className="space-y-4 flex-auto w-full md:flex md:flex-col md:gap-0">
        <div className="flex w-full justify-between gap-4">
          <p className="text-sm md:max-w-sm leading-5 line-clamp-2 transition-colors duration-150">
            {coupon.discountDescription}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="h-7 w-7 p-1 hidden md:flex"
            aria-label="Menu"
          >
            <Expand className="transition-colors duration-150" />
          </Button>
        </div>
        <div className="flex w-full justify-between md:items-center">
          <div className="flex gap-2 items-center text-sm">
            <CalendarClock className="group-hover:text-background transition-colors duration-150" />
            <span className="transition-colors duration-150">{expiration}</span>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full text-sm py-1.5 px-3.5 cursor-pointer select-all transition-colors duration-150"
            aria-label="Coupon code"
          >
            {coupon.code}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function getDiscountLabel(coupon: Coupon) {
  if (coupon.discount.type === "percent") {
    const value = Number(coupon.discount.value);
    return Number.isFinite(value) ? `${value}%` : `${coupon.discount.value}`;
  }

  if (coupon.discount.type === "amount") {
    const value = Number(coupon.discount.value);
    const currency = coupon.discount.currency ?? "USD";
    if (Number.isFinite(value)) {
      return formatCurrency(value, currency);
    }
  }

  return `${coupon.discount.value}`;
}

function getSuggestedSpendLabel(coupon: Coupon) {
  const spendAmount =
    coupon.suggestedSpend?.amount ?? coupon.minimumRequirement?.amount;
  if (!Number.isFinite(spendAmount ?? NaN)) {
    return null;
  }

  const currency =
    coupon.suggestedSpend?.currency ??
    coupon.minimumRequirement?.currency ??
    "USD";
  return formatCurrency(spendAmount as number, currency);
}

function formatExpirationDate(endDate?: string) {
  if (!endDate) return "Valid until (date TBA)";
  const date = new Date(endDate);
  if (Number.isNaN(date.getTime())) {
    return `Valid until (${endDate})`;
  }
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return `Valid until (${formatted})`;
}

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
