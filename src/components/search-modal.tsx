"use client";

import { Search as SearchIcon, X as XIcon } from "lucide-react";
import type { Coupon } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import type { ReactNode } from "react";

interface SearchModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  coupons?: Coupon[];
  children?: ReactNode;
}

export default function SearchModal({
  open,
  onOpenChange,
  coupons,
  children,
}: SearchModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent fullScreen showCloseButton={false}>
        <div className="container mx-auto px-4 max-w-2xl py-4 space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Search Coupon
            </DialogTitle>

            <DialogClose asChild>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                aria-label="Close"
              >
                <XIcon className="size-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>

          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder="Search by store, code or discount"
              className="h-11 rounded-lg pl-10"
              autoFocus
            />
          </div>

          <div>
            {/* coupon card list goes here */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
