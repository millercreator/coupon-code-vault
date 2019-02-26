import { useMemo } from "react";
import { useTheme } from "next-themes";
import type { Coupon, Store } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CouponCardProps {
  coupon: Coupon;
  store: Store | null;
}

const getBrandColors = (store: Store | null, dark: boolean) => {
  const palette = store?.colorPalette;
  if (!palette) return { background: undefined, foreground: undefined };
  const idx = dark ? 1 : 0;
  return {
    background: palette.background[idx],
    foreground: palette.foreground[idx],
  };
};

const CouponStoreLogo = ({ store }: { store: Store | null }) => {
  if (store?.logoUrl)
    return (
      <img
        src={store.logoUrl}
        alt={store.name}
        className="h-10 max-w-[44px] object-contain select-none pointer-events-none rounded-full"
        draggable={false}
        style={{ userSelect: "none" }}
      />
    );
  return (
    <span className="text-lg font-bold opacity-60">
      {store?.name?.[0]?.toUpperCase() || "🏬"}
    </span>
  );
};

export default function CouponCard({ coupon, store }: CouponCardProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const colors = useMemo(() => getBrandColors(store, dark), [store, dark]);
  const background = colors.background ?? (dark ? "#232323" : "#e6e6ea");
  const codeBg = colors.background ?? "#353535";
  const foreground = colors.foreground ?? (dark ? "#FFFFFF" : "#2E2E2E");

  const formattedExpiry = useMemo(() => {
    const endDate = coupon.expiration.endDate;
    if (!endDate) return "NO EXPIRY";
    const date = new Date(endDate);
    return (
      "VALID UNTIL " +
      date
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, " ")
        .toUpperCase()
    );
  }, [coupon.expiration.endDate]);

  const discountText = useMemo(() => {
    const { type, value, currency } = coupon.discount;
    if (type === "percent") return `${value}% OFF`;
    if (type === "amount") return `${currency || "$"}${value} OFF`;
    return coupon.discountDescription || "Special Offer";
  }, [coupon.discount, coupon.discountDescription]);

  const eligibilityText = useMemo(() => {
    const min = coupon.minimumRequirement;
    if (min && min.amount)
      return `On all orders above ${min.currency || "$"}${min.amount}`;
    return coupon.eligibleItemsDescription || coupon.discountDescription || "";
  }, [
    coupon.minimumRequirement,
    coupon.eligibleItemsDescription,
    coupon.discountDescription,
  ]);

  const circleStyle = { backgroundColor: colors.background || "#232323" };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center w-72 h-96 rounded-[12px] pt-0 overflow-hidden"
      )}
      style={{
        backgroundColor: colors.background || "#232323",
        color: colors.foreground || "#FFFFFF",
        maskImage: `radial-gradient(circle 22px at 0px calc(50% + 60px), transparent 18px, black 20px), radial-gradient(circle 22px at 100% calc(50% + 60px), transparent 18px, black 20px), linear-gradient(black, black)`,
        WebkitMaskImage: `radial-gradient(circle 22px at 0px calc(50% + 60px), transparent 18px, black 20px), radial-gradient(circle 22px at 100% calc(50% + 60px), transparent 18px, black 20px), linear-gradient(black, black)`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        maskSize: "100% 100%, 100% 100%, 100% 100%",
        maskPosition: "0 0, 100% 0, 0 0",
        maskRepeat: "no-repeat",
      }}
    >
      {/* Top strip */}
      <div
        className="absolute top-0 left-0 w-full h-14 rounded-t-[16px] flex items-center justify-center z-10"
        style={{
          backgroundColor: background,
          color: foreground,
        }}
      >
        <span className="text-xs tracking-widest font-medium">
          {formattedExpiry}
        </span>
      </div>

      {/* Coupon body - 8px base spacing */}
      <div className="flex flex-col flex-1 w-full items-center justify-center px-6 pt-[56px] pb-0 relative z-0">
        {/* Store logo with 16px below */}
        <div className="flex items-center justify-center mb-4 h-7">
          <CouponStoreLogo store={store} />
        </div>
        {/* "Value of" text with 8px above & below */}
        <div className="text-center text-sm tracking-wide opacity-70 mb-2">
          Value of
        </div>
        {/* Discount & eligibility */}
        <div className="text-center">
          <span className="font-extrabold text-3xl sm:text-4xl block leading-tight mb-1">
            {discountText}
          </span>
          <span className="block mt-0 text-sm  opacity-90">
            {eligibilityText}
          </span>
        </div>
      </div>

      {/* Perforated line - 16px top margin, 0 bottom margin (fits 8px rhythm) */}
      <div className="relative w-full flex flex-row items-center mt-4 mb-0 z-0">
        <div
          className="flex-grow border-t-2 border-dashed mx-5"
          style={{
            borderColor: foreground,
            opacity: 0.35,
          }}
        />
      </div>

      {/* Coupon code area with even spacing on all sides */}
      <div className="w-full flex flex-col items-center px-6 py-6.5">
        <span className="text-xs tracking-wide mb-4 opacity-80">
          Coupon code
        </span>
        <div
          className="w-full font-mono rounded-md px-6 py-3 text-base font-medium tracking-wider text-center select-all shadow-inner"
          style={{
            backgroundColor: codeBg,
            color: foreground,
            filter: "brightness(0.85)",
          }}
        >
          {coupon.code}
        </div>
      </div>
    </div>
  );
}
