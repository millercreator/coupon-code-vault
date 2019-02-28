"use client";

import { Search, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/assets/brand-logo.svg";

type TopNavbarProps = {
  onAddAction?: () => void;
  onSearchAction?: () => void;
  onMenuAction?: () => void;
};

export default function TopNavbar({ onAddAction, onSearchAction, onMenuAction }: TopNavbarProps) {
  return (
    <nav className="top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-2xl">
        <div className="flex items-center gap-2 h-8 w-auto">
          <BrandLogo className="h-full w-auto text-primary" />
        </div>
        <div className="flex items-center gap-1">
          {/* <Button size="icon" onClick={onAddAction} className="h-7 w-7 p-1" aria-label="Add new">
            <Plus className="text-primary-foreground" />
          </Button> */}
          <Button variant="ghost" size="icon" onClick={onSearchAction} className="h-7 w-7 p-1" aria-label="Search">
            <Search />
          </Button>
          <Button variant="ghost" size="icon" onClick={onMenuAction} className="h-7 w-7 p-1" aria-label="Menu">
            <Menu />
          </Button>
        </div>
      </div>
    </nav>
  );
}