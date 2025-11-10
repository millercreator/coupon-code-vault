"use client"

import { useState, useEffect } from "react"
import CouponVault from "@/components/coupon-vault"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <CouponVault />
}
