"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CouponForm from "./coupon-form"
import CouponCard from "./coupon-card"
import type { Coupon } from "@/lib/types"

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: "1",
    store: "Amazon",
    code: "SAVE20NOW",
    discount: "20% off orders over $50",
    expiryDate: "2025-12-31",
  },
  {
    id: "2",
    store: "Target",
    code: "CIRCLE15",
    discount: "$15 off $60 purchase",
    expiryDate: "2025-11-30",
  },
  {
    id: "3",
    store: "Best Buy",
    code: "TECH10",
    discount: "10% off electronics",
    expiryDate: "2025-10-15",
  },
  {
    id: "4",
    store: "Starbucks",
    code: "COFFEE5",
    discount: "$5 off any drink",
    expiryDate: "2024-11-20",
  },
  {
    id: "5",
    store: "Nike",
    code: "HOLIDAY25",
    discount: "25% off entire order",
    expiryDate: "2025-12-25",
  },
]

export default function CouponVault() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  // Load coupons from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("coupons")
    if (saved) {
      try {
        setCoupons(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load coupons:", e)
      }
    } else {
      setCoupons(DEFAULT_COUPONS)
    }
  }, [])

  // Save coupons to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("coupons", JSON.stringify(coupons))
    filterCoupons(searchTerm)
  }, [coupons, searchTerm])

  const filterCoupons = (term: string) => {
    setSearchTerm(term)
    const filtered = coupons.filter((coupon) => {
      const searchLower = term.toLowerCase()
      return (
        coupon.store.toLowerCase().includes(searchLower) ||
        coupon.code.toLowerCase().includes(searchLower) ||
        coupon.discount.toLowerCase().includes(searchLower)
      )
    })
    setFilteredCoupons(filtered)
  }

  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons([{ ...newCoupon, id: Date.now().toString() }, ...coupons])
    setShowForm(false)
  }

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id))
  }

  const activeCoupons = filteredCoupons.filter((c) => {
    const expiry = new Date(c.expiryDate).getTime()
    return expiry > Date.now()
  })

  const expiredCoupons = filteredCoupons.filter((c) => {
    const expiry = new Date(c.expiryDate).getTime()
    return expiry <= Date.now()
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="border-b border-border bg-card px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Coupon Vault</h1>
                <p className="text-sm text-muted-foreground">Secure discount storage</p>
              </div>
            </div>
            <Button onClick={() => setShowForm(true)} className="gap-2" size="sm">
              <Plus className="h-4 w-4" />
              Add Coupon
            </Button>
          </div>
        </div>

        <div className="space-y-6 px-4 py-6 sm:px-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by store, code, or discount..."
              value={searchTerm}
              onChange={(e) => filterCoupons(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Add Coupon Form */}
          {showForm && (
            <div className="rounded-lg border border-border bg-card p-6">
              <CouponForm onAdd={handleAddCoupon} onCancel={() => setShowForm(false)} />
            </div>
          )}

          {/* Active Coupons */}
          {activeCoupons.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Active ({activeCoupons.length})
              </h2>
              <div className="grid gap-4">
                {activeCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} onDelete={handleDeleteCoupon} />
                ))}
              </div>
            </div>
          )}

          {/* Expired Coupons */}
          {expiredCoupons.length > 0 && (
            <div className="space-y-3 opacity-60">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Expired ({expiredCoupons.length})
              </h2>
              <div className="grid gap-4">
                {expiredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} onDelete={handleDeleteCoupon} isExpired />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredCoupons.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 text-center">
              <Lock className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-foreground font-medium">{searchTerm ? "No coupons found" : "No coupons yet"}</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try adjusting your search" : "Add your first coupon to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
