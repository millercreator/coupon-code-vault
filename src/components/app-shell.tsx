"use client";

import TopNavbar from "@/components/top-navbar";
import SearchModal from "@/components/search-modal";
// import CouponForm from "@/components/coupon-form";
import { useState } from "react";

export default function AppShell() {
  const [addOpen, setAddOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openAdd = () => setAddOpen(true);
  const openSearch = () => setSearchOpen(true);
  const openMenu = () => setMenuOpen(true);

  return (
    <>
      <TopNavbar
        onSearchAction={openSearch}
        onMenuAction={openMenu}
      />
      {/* Mount your UI here so it’s controlled on the client */}
      {/* <CouponForm open={addOpen} onOpenChange={setAddOpen} /> */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      {/* <YourMenuSheet open={menuOpen} onOpenChange={setMenuOpen} /> */}
    </>
  );
}
