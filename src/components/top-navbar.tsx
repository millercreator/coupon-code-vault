"use client";

import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/assets/brand-logo.svg";
import Link from "next/link";
import { useState } from "react";
import { MainMenu } from "@/components/main-menu";
import SearchModal from "@/components/search-modal";

export default function TopNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="top-0 w-full bg-transparent z-[1000] relative">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-2xl">
        <div className="flex items-center gap-2 h-8 w-auto">
          <Link href="/" aria-label="Home" className="h-full w-auto ">
            <BrandLogo className="h-full w-auto text-primary" />
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <SearchModal open={searchOpen} onOpenChange={setSearchOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-1"
              aria-label="Search"
            >
              <Search className="size-6" />
            </Button>
          </SearchModal>
          <MainMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-1"
              aria-label="Menu"
            >
              <Menu className="size-6" />
            </Button>
          </MainMenu>
        </div>
      </div>
    </nav>
  );
}
