"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import type { Coupon, Store } from "@/lib/types";
import { SnapCarousel } from "@/components/snap-carousel";
import { CouponListCard } from "./coupon-list-card";

const stores: Store[] = [
  {
    id: "target",
    name: "Target",
    logoUrl:
      "https://cdn.brandfetch.io/id0ZfAM4Dt/w/240/h/240/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667573192808",
    colorPalette: {
      background: ["#CC0000", "#990000"], // Light, Dark
      foreground: ["#FFFFFF", "#F2F2F2"], // Accessible whites
    },
  },
  {
    id: "walmart",
    name: "Walmart",
    logoUrl:
      "https://cdn.brandfetch.io/idoGsFQrHx/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1736912992509",
    colorPalette: {
      background: ["#F7B400", "#0071CE"], // Light (yellow), Dark (blue)
      foreground: ["#2E2E2E", "#FFFFFF"], // Accessible black/white
    },
  },
  {
    id: "best_buy",
    name: "Best Buy",
    logoUrl:
      "https://cdn.brandfetch.io/idmSVs_Vxg/w/480/h/480/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1761207107240",
    colorPalette: {
      background: ["#FFE000", "#003087"], // Light (yellow), Dark (deep blue)
      foreground: ["#001A34", "#FFFFFF"], // Dark blue text for yellow, white for dark
    },
  },
  {
    id: "starbucks",
    name: "Starbucks",
    logoUrl:
      "https://cdn.brandfetch.io/idwBSkfVb3/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1727716459197",
    colorPalette: {
      background: ["#00704A", "#1E3932"], // Starbucks green, deeper dark green
      foreground: ["#FFFFFF", "#F4F4F2"], // Accessible white
    },
  },
  {
    id: "ulta_beauty",
    name: "Ulta Beauty",
    logoUrl:
      "https://cdn.brandfetch.io/idBv2IbOz2/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667580295387",
    colorPalette: {
      background: ["#FF6F00", "#A34F1F"], // Vibrant orange, deep brown/orange
      foreground: ["#FFFFFF", "#FFF8F0"], // Accessible for branding
    },
  },
  {
    id: "nike",
    name: "Nike",
    logoUrl:
      "https://cdn.brandfetch.io/id_0dwKPKT/w/399/h/399/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1741746473623",
    colorPalette: {
      background: ["#FFFFFF", "#111111"], // Nike is white or almost black
      foreground: ["#111111", "#FFFFFF"], // Black on white, white on black
    },
  },
  {
    id: "gap",
    name: "GAP",
    logoUrl:
      "https://cdn.brandfetch.io/idgoQYa6uK/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1674701440935",
    colorPalette: {
      background: ["#002244", "#141823"], // GAP navy blue, darker blue (dark mode)
      foreground: ["#FFFFFF", "#F6F6F6"], // White or near-white
    },
  },
];

const DEFAULT_COUPONS: Coupon[] = [
  // Target (3 coupons)
  {
    id: "TGT10",
    storeId: "target",
    code: "SPRING10",
    discount: { type: "percent", value: 10 },
    discountDescription: "10% off your entire Target purchase",
    listSummary: "Refresh pantry staples and save across the whole cart.",
    suggestedSpend: { amount: 60, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 30,
      currency: "USD",
      description: "Minimum spend $30",
    },
    expiration: { endDate: "2025-01-31" },
  },
  {
    id: "TGT15",
    storeId: "target",
    code: "TARGET15",
    discount: { type: "percent", value: 15 },
    discountDescription: "15% off select home items at Target",
    listSummary: "Give your living room a quick glow up with extra savings.",
    suggestedSpend: { amount: 80, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 50,
      currency: "USD",
      description: "Minimum spend $50",
    },
    eligibleItemsDescription: "Home decor & furniture",
    expiration: { endDate: "2024-10-31" },
  },
  {
    id: "TGT20",
    storeId: "target",
    code: "SAVE20TGT",
    discount: { type: "percent", value: 20 },
    discountDescription: "20% off new arrivals at Target",
    listSummary: "Try the latest collections and snag an instant 20% off.",
    suggestedSpend: { amount: 75, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Only for newly listed items",
    expiration: { endDate: "2024-08-31" },
  },

  // Walmart (3 coupons)
  {
    id: "WMT12",
    storeId: "walmart",
    code: "WMALL12",
    discount: { type: "percent", value: 12 },
    discountDescription: "12% off groceries at Walmart",
    listSummary: "Stretch the grocery budget on every weekly run.",
    suggestedSpend: { amount: 120, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Groceries only",
    expiration: { endDate: "2024-09-30" },
  },
  {
    id: "WMT10TOYS",
    storeId: "walmart",
    code: "TOYDEAL10",
    discount: { type: "percent", value: 10 },
    discountDescription: "10% off toys at Walmart",
    listSummary: "Surprise the kids with markdowns on their favorite toys.",
    suggestedSpend: { amount: 90, currency: "USD" },
    redemptionMethod: "inStore",
    eligibleItemsDescription: "Toys department only",
    expiration: { endDate: "2024-12-31" },
  },
  {
    id: "WMT5",
    storeId: "walmart",
    code: "WELCOME5",
    discount: { type: "percent", value: 5 },
    discountDescription: "5% off any order at Walmart.com",
    listSummary: "Apply this welcome perk to any online basket.",
    suggestedSpend: { amount: 60, currency: "USD" },
    redemptionMethod: "online",
    expiration: { endDate: "2024-12-15" },
  },

  // Best Buy (3 coupons)
  {
    id: "BBY20",
    storeId: "best_buy",
    code: "TECH20",
    discount: { type: "percent", value: 20 },
    discountDescription: "20% off headphones at Best Buy",
    listSummary: "Upgrade your listening setup with quick savings on audio.",
    suggestedSpend: { amount: 150, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Headphones only",
    expiration: { endDate: "2024-10-10" },
  },
  {
    id: "BBY15",
    storeId: "best_buy",
    code: "SAVE15BBY",
    discount: { type: "percent", value: 15 },
    discountDescription: "15% off any computer accessory",
    listSummary:
      "Grab fresh accessories for the desk without paying full price.",
    suggestedSpend: { amount: 110, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Mice, keyboards, monitors",
    expiration: { endDate: "2024-12-31" },
  },
  {
    id: "BBY10",
    storeId: "best_buy",
    code: "BBY10DEAL",
    discount: { type: "percent", value: 10 },
    discountDescription: "10% off your next purchase at Best Buy",
    listSummary: "Cover that next tech splurge with an easy 10% drop.",
    suggestedSpend: { amount: 200, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 100,
      currency: "USD",
      description: "Min spend $100",
    },
    expiration: { endDate: "2025-01-10" },
  },

  // Starbucks (3 coupons)
  {
    id: "SBX5",
    storeId: "starbucks",
    code: "CUP5OFF",
    discount: { type: "percent", value: 5 },
    discountDescription: "5% off in-store drinks at Starbucks",
    listSummary: "Pick up your daily latte with a little bonus savings.",
    suggestedSpend: { amount: 15, currency: "USD" },
    redemptionMethod: "inStore",
    eligibleItemsDescription: "All espresso drinks",
    expiration: { endDate: "2024-07-31" },
  },
  {
    id: "SBX8",
    storeId: "starbucks",
    code: "BEANS8",
    discount: { type: "percent", value: 8 },
    discountDescription: "8% off bagged coffee at Starbucks",
    listSummary: "Stock the pantry with beans and keep mornings smooth.",
    suggestedSpend: { amount: 35, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Bagged coffee and coffee pods",
    expiration: { endDate: "2024-09-30" },
  },
  {
    id: "SBX10",
    storeId: "starbucks",
    code: "COLD10",
    discount: { type: "percent", value: 10 },
    discountDescription: "10% off cold brews at Starbucks",
    listSummary: "Cool down with a cold brew and shave off the total.",
    suggestedSpend: { amount: 20, currency: "USD" },
    redemptionMethod: "inStore",
    eligibleItemsDescription: "Cold brew beverages",
    expiration: { endDate: "2024-08-31" },
  },

  // Ulta Beauty (2 coupons)
  {
    id: "ULTA20",
    storeId: "ulta_beauty",
    code: "ULTA20",
    discount: { type: "percent", value: 20 },
    discountDescription: "20% off any one qualifying item",
    listSummary: "Treat yourself to a prestige pick-me-up and take 20% off.",
    suggestedSpend: { amount: 70, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "See Ulta exclusions for prestige brands",
    expiration: { endDate: "2024-11-30" },
  },
  {
    id: "ULTA15SKIN",
    storeId: "ulta_beauty",
    code: "SKIN15",
    discount: { type: "percent", value: 15 },
    discountDescription: "15% off selected skincare at Ulta",
    listSummary: "Refresh your skincare shelf with a tidy 15% discount.",
    suggestedSpend: { amount: 85, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Serums & moisturizers",
    expiration: { endDate: "2024-09-15" },
  },

  // Nike (3 coupons)
  {
    id: "NIKE25",
    storeId: "nike",
    code: "RUN25",
    discount: { type: "percent", value: 25 },
    discountDescription: "25% off all running shoes",
    listSummary: "Lace up new runners and slice a quarter off the tag.",
    suggestedSpend: { amount: 130, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Running shoes",
    expiration: { endDate: "2024-08-31" },
  },
  {
    id: "NIKE10",
    storeId: "nike",
    code: "TRAIN10",
    discount: { type: "percent", value: 10 },
    discountDescription: "10% off new training gear",
    listSummary: "Refresh the workout wardrobe with an easy 10% savings.",
    suggestedSpend: { amount: 95, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Nike training apparel",
    expiration: { endDate: "2024-12-31" },
  },
  {
    id: "NIKE15",
    storeId: "nike",
    code: "NKYFALL15",
    discount: { type: "percent", value: 15 },
    discountDescription: "15% off any purchase over $60",
    listSummary: "Grab seasonal gear and unlock 15% off past $60.",
    suggestedSpend: { amount: 120, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 60,
      currency: "USD",
      description: "Min spend $60",
    },
    expiration: { endDate: "2024-10-01" },
  },

  // Gap (3 coupons)
  {
    id: "GAP20",
    storeId: "gap",
    code: "GAPNEW20",
    discount: { type: "percent", value: 20 },
    discountDescription: "20% off new arrivals at GAP",
    listSummary: "Ease into new-season fits with 20% off fresh drops.",
    suggestedSpend: { amount: 100, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "New arrivals only",
    expiration: { endDate: "2024-09-30" },
  },
  {
    id: "GAP15",
    storeId: "gap",
    code: "GAPESS15",
    discount: { type: "percent", value: 15 },
    discountDescription: "15% off essentials at GAP",
    listSummary: "Re-up on daily essentials and keep 15% in your pocket.",
    suggestedSpend: { amount: 80, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Men’s and women’s essentials",
    expiration: { endDate: "2024-10-31" },
  },
  {
    id: "GAP10",
    storeId: "gap",
    code: "GAPKIDS10",
    discount: { type: "percent", value: 10 },
    discountDescription: "10% off GAPKids",
    listSummary: "Outfit the little ones with a friendly 10% markdown.",
    suggestedSpend: { amount: 70, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "GAPKids collection",
    expiration: { endDate: "2024-12-31" },
  },
];

export default function CouponVault() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [frontCoupon, setFrontCoupon] = useState<Coupon | null>(null);

  const [mounted, setMounted] = useState(false);

  /**
   * Get the unique order of storeIds as they appear in the coupons array.
   */
  function getUniqueStoreOrder(coupons: Coupon[]): string[] {
    const storeOrder: string[] = [];
    coupons.forEach((c) => {
      if (!storeOrder.includes(c.storeId)) {
        storeOrder.push(c.storeId);
      }
    });
    return storeOrder;
  }

  /**
   * Get a cyclically reordered array of storeIds placing the active storeId's group first.
   */
  function getReorderedStoreOrder(
    storeOrder: string[],
    activeStoreId: string
  ): string[] {
    const idx = storeOrder.indexOf(activeStoreId);
    if (idx === -1) return storeOrder; // fallback if storeId doesn't exist
    return [...storeOrder.slice(idx), ...storeOrder.slice(0, idx)];
  }

  /**
   * Collects coupons by the array of storeIds order.
   */
  function groupCouponsByStoreOrder(
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
   * Reorganizes the coupons list so all coupons of the given store appear as the next group.
   * @param {string} storeId - The ID of the active store.
   */
  function reorganizeCouponsByStore(storeId: string) {
    const storeOrder = getUniqueStoreOrder(coupons);
    const reorderedStoreOrder = getReorderedStoreOrder(storeOrder, storeId);
    return groupCouponsByStoreOrder(coupons, reorderedStoreOrder);
  }

  function getActiveStore() {
    if (!frontCoupon) return null;
    return stores.find((store) => store.id === frontCoupon.storeId) || null;
  }

  useEffect(() => {
    setMounted(true);
    let loadedCoupons: Coupon[] = [];

    try {
      const couponsSaved = localStorage.getItem("coupons");
      loadedCoupons = couponsSaved ? JSON.parse(couponsSaved) : [];
      if (!Array.isArray(loadedCoupons)) loadedCoupons = [];
    } catch (e) {
      console.error("Failed to load coupons:", e);
      loadedCoupons = [];
    }

    if (loadedCoupons.length === 0) {
      loadedCoupons = DEFAULT_COUPONS;
    }

    setCoupons(loadedCoupons);
    setFrontCoupon(loadedCoupons[0] || null);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen mx-auto max-w-2xl">
      <div className="relative max-w-[720px] mx-auto my-10 space-y-2">
        <SnapCarousel
          items={stores}
          activeId={frontCoupon ? frontCoupon.storeId : stores[0].id}
          itemSize={64}
          gap={12}
          lockSpacing={6}
          classNames={{
            track: "gap-0",
            item: "bg-muted overflow-hidden border-none",
            activeItem: "",
            root: "",
            lock: "border-foreground border-[2.5px] rounded-[14px]",
          }}
          renderItemAction={(store, locked) => {
            const opacity = !locked ? 0.3 : 1;
            return (
              <Image
                src={store.logoUrl!}
                alt={store.name}
                width={64}
                height={64}
                className="object-contain select-none pointer-events-none"
                style={{ opacity, userSelect: "none" }}
                unoptimized
                draggable={false}
              />
            );
          }}
          onChangeAction={(i, store) => {
            if (store.id !== frontCoupon?.storeId) {
              const sortedCoupons = reorganizeCouponsByStore(store.id);
              setCoupons(sortedCoupons);
              const storeCoupons = sortedCoupons.filter(
                (c) => c.storeId === store.id
              );
              if (storeCoupons.length > 0) {
                setFrontCoupon(storeCoupons[0]);
              }
            }
          }}
        />
        <h3 className="text-sm text-center ">
          {getActiveStore() ? getActiveStore()!.name : "Store"}
        </h3>
      </div>
      <div className="divide-y divide-border divide-dashed">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <CouponListCard key={coupon.id} coupon={coupon} />
          ))
        ) : (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No coupons saved yet. Swipe to add some deals.
          </div>
        )}
      </div>
    </div>
  );
}
