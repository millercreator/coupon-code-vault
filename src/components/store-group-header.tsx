import Image from "next/image";
import type { Store } from "@/lib/types";

interface StoreGroupHeaderProps {
  store: Store;
}

/**
 * Header component for a store group section
 * Displays store logo and name in a sticky header
 */
export function StoreGroupHeader({ store }: StoreGroupHeaderProps) {
  return (
    <div className="sticky top-[120px] z-10 bg-background py-4 px-6 ">
      <div className="flex items-center gap-3">
        {store.logoUrl && (
          <Image
            src={store.logoUrl}
            alt={store.name}
            width={24}
            height={24}
            className="object-contain rounded-full"
            unoptimized
          />
        )}
        <h2 className="text-base font-semibold text-foreground">
          {store.name}
        </h2>
      </div>
    </div>
  );
}

