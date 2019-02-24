"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Coupon, Store } from "@/lib/types";
import { SnapCarousel } from "@/components/snap-carousel";
import SwipeCards, { CardType } from "./swipe-cards";

const stores: Store[] = [
  {
    id: "target",
    name: "Target",
    logoUrl:
      "https://cdn.brandfetch.io/id0ZfAM4Dt/w/240/h/240/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667573192808",
  },
  {
    id: "walmart",
    name: "Walmart",
    logoUrl:
      "https://cdn.brandfetch.io/idoGsFQrHx/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1736912992509",
  },
  {
    id: "best_buy",
    name: "Best Buy",
    logoUrl:
      "https://cdn.brandfetch.io/idmSVs_Vxg/w/480/h/480/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1761207107240",
  },
  {
    id: "starbucks",
    name: "Starbucks",
    logoUrl:
      "https://cdn.brandfetch.io/idwBSkfVb3/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1727716459197",
  },
  {
    id: "ulta_beauty",
    name: "Ulta Beauty",
    logoUrl:
      "https://cdn.brandfetch.io/idBv2IbOz2/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667580295387",
  },
  {
    id: "nike",
    name: "Nike",
    logoUrl:
      "https://cdn.brandfetch.io/id_0dwKPKT/w/399/h/399/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1741746473623",
  },
  {
    id: "gap",
    name: "GAP",
    logoUrl:
      "https://cdn.brandfetch.io/idgoQYa6uK/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1674701440935",
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
    redemptionMethod: "online",
    eligibleItemsDescription: "GAPKids collection",
    expiration: { endDate: "2024-12-31" },
  },
];

const cardData: CardType[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function CouponVault() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [frontCoupon, setFrontCoupon] = useState<Coupon | null>(null);
  const [activeStore, setActiveStore] = useState<Store | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("coupons");
    if (saved) {
      try {
        setCoupons(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load coupons:", e);
      }
    } else {
      setCoupons(DEFAULT_COUPONS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coupons", JSON.stringify(coupons));
  }, [coupons]);

  return (
    <div className="min-h-screen mx-auto max-w-2xl">
      <div>
        <SwipeCards
          cards={DEFAULT_COUPONS}
          onCardEnterFront={(card) => {
            setFrontCoupon(card);
          }}
          renderCard={(card) => (
            <div className="h-96 w-72 bg-muted rounded-lg p-4 relative">
              {/* TODO LATER: create coupon component here */}
            </div>
          )}
        />
      </div>
      <div className="relative max-w-[720px] mx-auto my-10 space-y-2">
        <h3 className="text-sm text-center ">
          {activeStore?.name || "Google"}
        </h3>
        <SnapCarousel
          items={stores}
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
          onChangeAction={(i, store) => setActiveStore(store)}
        />
      </div>
    </div>
  );
}
