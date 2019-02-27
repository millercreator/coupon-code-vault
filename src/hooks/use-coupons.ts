import { useState, useEffect, useMemo } from "react";
import type { Coupon } from "@/lib/types";
import { DEFAULT_COUPONS } from "@/data/placeholders";
import { stores } from "@/data/placeholders";
import { groupCouponsByStoreOrder, isCouponArray } from "@/lib/coupon-utils";
import { useLocalStorage } from "./use-local-storage";

interface UseCouponsReturn {
  coupons: Coupon[];
  activeStoreId: string | null;
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  setActiveStoreId: React.Dispatch<React.SetStateAction<string | null>>;
  mounted: boolean;
}

/**
 * Custom hook to manage coupons from localStorage
 * Handles loading, initialization, and sorting by store order
 */
export function useCoupons(): UseCouponsReturn {
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

  // Sort coupons by store order whenever rawCoupons change
  const coupons = useMemo(() => {
    if (rawCoupons.length === 0) return rawCoupons;

    // Get store order from stores array, filtered to only stores with coupons
    const storeOrder = stores
      .map((s) => s.id)
      .filter((id) => rawCoupons.some((c) => c.storeId === id));

    return groupCouponsByStoreOrder(rawCoupons, storeOrder);
  }, [rawCoupons]);

  // Update activeStoreId when coupons change (if not already set)
  useEffect(() => {
    if (mounted && coupons.length > 0 && !activeStoreId) {
      const firstCoupon = coupons[0] || null;
      setActiveStoreId(firstCoupon?.storeId || null);
    }
  }, [coupons, mounted, activeStoreId]);

  // Wrapper to set coupons (saves to localStorage via setRawCoupons)
  // Note: This works with the sorted coupons array that users see
  const setCoupons = (value: React.SetStateAction<Coupon[]>) => {
    if (typeof value === "function") {
      setRawCoupons((prevRaw) => {
        // Re-sort prevRaw to match what user sees, then apply their function
        const storeOrder = stores
          .map((s) => s.id)
          .filter((id) => prevRaw.some((c) => c.storeId === id));
        const sortedPrev = groupCouponsByStoreOrder(prevRaw, storeOrder);
        const newSorted = value(sortedPrev);
        // Save the new value (it will be re-sorted on next render anyway)
        return newSorted;
      });
    } else {
      setRawCoupons(value);
    }
  };

  return {
    coupons,
    activeStoreId,
    setCoupons,
    setActiveStoreId,
    mounted,
  };
}
