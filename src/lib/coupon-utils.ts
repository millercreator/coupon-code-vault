import type { Coupon } from "./types";

/**
 * Validates that a value is an array of Coupon objects
 * Type guard function for runtime validation
 */
export function isCouponArray(value: unknown): value is Coupon[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "storeId" in item &&
        "code" in item
    )
  );
}

/**
 * Groups coupons by store ID in the order specified by storeOrder array
 */
export function groupCouponsByStoreOrder(
  coupons: Coupon[],
  storeOrder: string[]
): Coupon[] {
  const groupedCoupons: Coupon[] = [];
  storeOrder.forEach((sId) => {
    groupedCoupons.push(...coupons.filter((c) => c.storeId === sId));
  });
  return groupedCoupons;
}

/**
 * Groups coupons by store while maintaining the order of first occurrence
 * Returns an array of store groups with their coupons
 */
export function groupCouponsByStore(
  coupons: Coupon[]
): { storeId: string; coupons: Coupon[] }[] {
  const storeGroups: { storeId: string; coupons: Coupon[] }[] = [];
  const storeMap = new Map<string, Coupon[]>();

  // First, group all coupons by storeId
  coupons.forEach((coupon) => {
    if (!storeMap.has(coupon.storeId)) {
      storeMap.set(coupon.storeId, []);
    }
    storeMap.get(coupon.storeId)!.push(coupon);
  });

  // Maintain order based on first occurrence in coupons array
  const seenStores = new Set<string>();
  coupons.forEach((coupon) => {
    if (!seenStores.has(coupon.storeId)) {
      seenStores.add(coupon.storeId);
      storeGroups.push({
        storeId: coupon.storeId,
        coupons: storeMap.get(coupon.storeId)!,
      });
    }
  });

  return storeGroups;
}

