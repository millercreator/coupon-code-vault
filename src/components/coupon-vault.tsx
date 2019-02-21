"use client";

import { useState, useEffect } from "react";
import type { Coupon } from "@/lib/types";
import { SnapCarousel } from "@/components/snap-carousel";

const DEFAULT_COUPONS: Coupon[] = [];

export default function CouponVault() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const logos = ["G", "o", "o", "g", "l", "e", "1", "2", "3"];

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
      <div style={{ maxWidth: 720, margin: "40px auto" }}>
        <h3 style={{ textAlign: "center" }}>Google</h3>
        <SnapCarousel
          items={logos}
          itemSize={64}
          gap={8}
          lockSpacing={6}
          lockStyle={{
            borderColor: "#1a1a1a",
            borderWidth: 2.5,
            borderRadius: 12,
          }}
          renderItemAction={(ch, locked) => (
            <span style={{ fontSize: 22, opacity: locked ? 1 : 0.7 }}>
              {ch}
            </span>
          )}
          onChangeAction={(i) => console.log("locked:", i)}
        />
      </div>
    </div>
  );
}
