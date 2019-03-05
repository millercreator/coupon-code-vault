"use client";

import TopNavbar from "@/components/top-navbar";
import SearchModal from "@/components/search-modal";
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
      />
      {/* Mount your UI here so it’s controlled on the client */}
      {/* <CouponForm open={addOpen} onOpenChange={setAddOpen} /> */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
