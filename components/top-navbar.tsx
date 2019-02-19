"use client";

import { Search, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/assets/brand-logo.svg";

export default function TopNavbar() {
  const handleSearchClick = () => {
    // Implement search click logic here
    // For example: open a search bar/modal or focus input
    // console.log("Search icon clicked")
  };

  const handleAddClick = () => {
    // Implement add new coupon logic here
    // For example: open an add coupon form/modal
    // console.log("Add icon clicked")
  };

  const handleMenuClick = () => {
    // Implement menu open logic here
    // For example: open a sidebar or dropdown menu
    // console.log("Menu icon clicked")
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-2xl">
        {/* Logo - flex to left */}
        <div className="flex items-center gap-2 h-8 w-auto">
          <BrandLogo className="h-full w-auto text-primary" />
        </div>

        {/* Icons - flex to right */}
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            onClick={handleAddClick}
            className="h-7 w-7 p-1"
            aria-label="Add new"
          >
            <Plus className="text-primary-foreground" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchClick}
            className="h-7 w-7 p-1"
            aria-label="Search"
          >
            <Search />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuClick}
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
