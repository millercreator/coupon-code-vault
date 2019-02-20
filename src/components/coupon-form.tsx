"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Coupon } from "@/lib/types"

interface CouponFormProps {
  onAdd: (coupon: Coupon) => void
  onCancel: () => void
}

export default function CouponForm({ onAdd, onCancel }: CouponFormProps) {
  const [formData, setFormData] = useState({
    store: "",
    code: "",
    discount: "",
    expiryDate: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.store.trim()) {
      newErrors.store = "Store name is required"
    }
    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required"
    }
    if (!formData.discount.trim()) {
      newErrors.discount = "Discount details are required"
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (new Date(formData.expiryDate) < new Date()) {
      newErrors.expiryDate = "Expiry date must be in the future"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onAdd({
      id: "",
      store: formData.store,
      code: formData.code,
      discount: formData.discount,
      expiryDate: formData.expiryDate,
    })

    setFormData({
      store: "",
      code: "",
      discount: "",
      expiryDate: "",
    })
    setErrors({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-foreground">Add New Coupon</h3>

      <div className="space-y-2">
        <label htmlFor="store" className="text-sm font-medium text-foreground">
          Store Name
        </label>
        <Input
          id="store"
          name="store"
          placeholder="e.g., Amazon, Target, Starbucks"
          value={formData.store}
          onChange={handleChange}
          className={errors.store ? "border-destructive" : ""}
        />
        {errors.store && <p className="text-xs text-destructive">{errors.store}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="code" className="text-sm font-medium text-foreground">
          Coupon Code
        </label>
        <Input
          id="code"
          name="code"
          placeholder="e.g., SAVE20"
          value={formData.code}
          onChange={handleChange}
          className={errors.code ? "border-destructive" : ""}
        />
        {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="discount" className="text-sm font-medium text-foreground">
          Discount Details
        </label>
        <Input
          id="discount"
          name="discount"
          placeholder="e.g., 20% off, $10 off $50, Free shipping"
          value={formData.discount}
          onChange={handleChange}
          className={errors.discount ? "border-destructive" : ""}
        />
        {errors.discount && <p className="text-xs text-destructive">{errors.discount}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="expiryDate" className="text-sm font-medium text-foreground">
          Expiry Date
        </label>
        <Input
          id="expiryDate"
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          className={errors.expiryDate ? "border-destructive" : ""}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.expiryDate && <p className="text-xs text-destructive">{errors.expiryDate}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          Add Coupon
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
