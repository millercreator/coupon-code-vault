"use client";

import Image from "next/image";
import { SnapCarousel } from "@/components/snap-carousel";
import { CouponListCard } from "@/components/coupon-list-card";
import { StoreGroupHeader } from "@/components/store-group-header";
import { stores } from "@/data/placeholders";
import { useCoupons } from "@/hooks/use-coupons";
import { groupCouponsByStore } from "@/lib/coupon-utils";

export default function Home() {
  const { coupons, activeStoreId, setActiveStoreId, mounted } = useCoupons();

  const activeStore =
    stores.find(
      (store) => store.id === (activeStoreId || coupons[0]?.storeId)
    ) || null;

  // Wait for hydration to avoid mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen mx-auto max-w-2xl">
      <div className="z-50 sticky top-0 bg-background max-w-[720px] mx-auto py-4 space-y-2">
        <SnapCarousel
          items={stores}
          activeId={activeStoreId || coupons[0]?.storeId || stores[0].id}
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
          onChangeAction={(_, store) => {
            if (store.id !== activeStoreId) {
              setActiveStoreId(store.id);
            }
          }}
        />
        <h3 className="text-sm text-center">
          {activeStore ? activeStore.name : "Store"}
        </h3>
      </div>
      <div className="max-w-lg mx-auto pb-[100vh]">
        {coupons.length > 0 ? (
          (() => {
            const storeGroups = groupCouponsByStore(coupons);

            return storeGroups.map((group) => {
              const store = stores.find((s) => s.id === group.storeId);
              return (
                <div key={group.storeId} className="store-group">
                  {store && <StoreGroupHeader store={store} />}
                  <div>
                    {group.coupons.map((coupon, idx) => (
                      <CouponListCard coupon={coupon} key={coupon.id} />
                    ))}
                  </div>
                </div>
              );
            });
          })()
        ) : (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No coupons saved yet. Swipe to add some deals.
          </div>
        )}
      </div>
    </div>
  );
}
