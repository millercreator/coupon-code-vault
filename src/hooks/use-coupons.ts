import { useState, useEffect, useMemo } from "react";
import type { Coupon } from "@/lib/types";
import { DEFAULT_COUPONS } from "@/data/placeholders";
import { stores } from "@/data/placeholders";
import { groupCouponsByStoreOrder, isCouponArray } from "@/lib/coupon-utils";
import { useLocalStorage } from "./use-local-storage";

export function useCoupons() {
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);

  const {
    value: rawCoupons,
    setValue: setRawCoupons,
    mounted,
  } = useLocalStorage<Coupon[]>({
    key: "coupons",
    defaultValue: DEFAULT_COUPONS,
    validate: isCouponArray,
  });

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

  const setCoupons = setRawCoupons;

  return {
    coupons,
    activeStoreId,
    setCoupons,
    setActiveStoreId,
    mounted,
  };
}
