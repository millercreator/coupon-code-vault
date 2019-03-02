"use client";

import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/assets/brand-logo.svg";
import Link from "next/link";

type TopNavbarProps = {
  onSearchAction?: () => void;
  onMenuAction?: () => void;
};

export default function TopNavbar(props: TopNavbarProps) {
  const { onSearchAction, onMenuAction } = props;
  return (
    <nav className="top-0 w-full bg-transparent z-[1000] relative">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-2xl">
        <div className="flex items-center gap-2 h-8 w-auto">
          <Link href="/" aria-label="Home" className="h-full w-auto ">
            <BrandLogo className="h-full w-auto text-primary" />
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearchAction}
            className="h-7 w-7 p-1"
            aria-label="Search"
          >
            <Search />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuAction}
            className="h-7 w-7 p-1"
            aria-label="Menu"
          >
            <Menu />
          </Button>
        </div>
      </div>
    </nav>
  );
}
