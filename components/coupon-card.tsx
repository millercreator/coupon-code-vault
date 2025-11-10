"use client"

import { Copy, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Coupon } from "@/lib/types"

interface CouponCardProps {
  coupon: Coupon
  onDelete: (id: string) => void
  isExpired?: boolean
}

export default function CouponCard({ coupon, onDelete, isExpired = false }: CouponCardProps) {
  const { toast } = useToast()
  const expiryDate = new Date(coupon.expiryDate)
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code)
    toast({
      description: "Code copied to clipboard",
      duration: 2000,
    })
  }

  const getExpiryLabel = () => {
    if (isExpired) return "Expired"
    if (daysUntilExpiry === 0) return "Expires today"
    if (daysUntilExpiry === 1) return "Expires tomorrow"
    if (daysUntilExpiry <= 7) return `${daysUntilExpiry} days left`
    return expiryDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getExpiryColor = () => {
    if (isExpired) return "text-destructive"
    if (daysUntilExpiry <= 3) return "text-orange-500"
    return "text-green-600"
  }

  return (
    <div
      className={`rounded-lg border border-border bg-card p-4 transition-all ${
        isExpired ? "opacity-75 grayscale" : ""
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Store</p>
            <p className="text-lg font-semibold text-foreground">{coupon.store}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Discount</p>
            <p className="text-base text-foreground">{coupon.discount}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Code</p>
              <p className="font-mono text-sm font-semibold text-foreground">{coupon.code}</p>
            </div>

            <div className="flex items-end gap-2">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Expires</p>
                <div className="flex items-center gap-1 pt-0.5">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <p className={`text-sm font-medium ${getExpiryColor()}`}>{getExpiryLabel()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 self-start">
          <Button variant="outline" size="sm" onClick={handleCopyCode} className="gap-2 bg-transparent">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(coupon.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
