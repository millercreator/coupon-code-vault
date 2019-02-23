"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Coupon } from "@/lib/types";
import { SnapCarousel } from "@/components/snap-carousel";
import SwipeCards, { CardType } from "./swipe-cards";

const DEFAULT_COUPONS: Coupon[] = [];

type Brand = {
  logo: string;
  id: string;
  label: string;
};

const brands: Brand[] = [
  {
    id: "google",
    label: "Google",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Vivian",
  },
  {
    id: "apple",
    label: "Apple",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Brooklynn",
  },
  {
    id: "microsoft",
    label: "Microsoft",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Jessica",
  },
  {
    id: "amazon",
    label: "Amazon",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Leo",
  },
  {
    id: "facebook",
    label: "Facebook",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Ryker",
  },
  {
    id: "twitter",
    label: "Twitter",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Caleb",
  },
  {
    id: "netflix",
    label: "Netflix",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Wyatt",
  },
  {
    id: "adobe",
    label: "Adobe",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Andrea",
  },
  {
    id: "spotify",
    label: "Spotify",
    logo: "https://api.dicebear.com/9.x/glass/svg?seed=Eliza",
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
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);

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
          cards={cardData}
          renderCard={(card) => (
            <div className="h-96 w-72 bg-white rounded-lg p-4 relative">
              <h2 className="text-black">{card.title}</h2>
              <p>{card.description}</p>
            </div>
          )}
        />
      </div>
      <div className="relative max-w-[720px] mx-auto my-10 space-y-2">
        <h3 className="text-sm text-center ">
          {activeBrand?.label || "Google"}
        </h3>
        <SnapCarousel
          items={brands}
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
          renderItemAction={(brand, locked) => {
            const opacity = !locked ? 0.3 : 1;
            return (
              <Image
                src={brand.logo}
                alt={brand.label}
                width={64}
                height={64}
                className="object-contain select-none pointer-events-none"
                style={{ opacity, userSelect: "none" }}
                unoptimized
                draggable={false}
              />
            );
          }}
          onChangeAction={(i, brand) => setActiveBrand(brand)}
        />
      </div>
    </div>
  );
}
