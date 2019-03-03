import { useState, useEffect, useMemo } from "react";
import type { Coupon } from "@/lib/types";
import { DEFAULT_COUPONS } from "@/data/placeholders";
import { stores } from "@/data/placeholders";
import { groupCouponsByStoreOrder } from "@/lib/coupon-utils";

export function useCoupons() {
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);
  const mounted = true;

  // Always use the default coupons, skip local storage entirely
  const rawCoupons = DEFAULT_COUPONS;

  const coupons = useMemo(() => {
    if (rawCoupons.length === 0) return rawCoupons;
    const storeOrder = stores
      .map((s) => s.id)
      .filter((id) => rawCoupons.some((c) => c.storeId === id));
    return groupCouponsByStoreOrder(rawCoupons, storeOrder);
  }, [rawCoupons]);

  useEffect(() => {
    if (mounted && coupons.length > 0 && !activeStoreId) {
      setActiveStoreId(coupons[0]?.storeId || null);
    }
  }, [coupons, mounted, activeStoreId]);

  const setCoupons = () => {}; // noop

  return {
    coupons,
    activeStoreId,
    setCoupons,
    setActiveStoreId,
    mounted,
  };
}
