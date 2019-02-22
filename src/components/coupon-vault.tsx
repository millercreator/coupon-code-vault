"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Coupon } from "@/lib/types";
import { SnapCarousel } from "@/components/snap-carousel";

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
