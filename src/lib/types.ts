export interface Coupon {
  id: string
  storeId: string              // Store unique identifier
  code: string                 // Coupon code to redeem
  discount: {
    type: 'percent' | 'amount' | 'bogo' | 'freeShipping' | string, // Type of discount
    value: number | string,     // The value, can be percent, amount, or details for custom
    currency?: string           // Currency code if type is amount
  }
  discountDescription: string   // Human friendly description of discount
  redemptionMethod: 'online' | 'inStore' | 'both' | string  // How this coupon can be redeemed
  minimumRequirement?: {
    amount?: number             // Minimum cart/subtotal amount (if any)
    currency?: string           // Currency for minimum requirement
    itemCount?: number          // Minimum quantity of items, if applicable
    description?: string        // Human description of requirement, optional
  }
  eligibleItems?: string[]      // Array of eligible item IDs/SKUs/categories, or undefined for all
  eligibleItemsDescription?: string // Optional, describes eligible items/range in plain text
  expiration: {
    startDate?: string          // ISO date string for when coupon becomes valid
    endDate: string             // ISO date string for expiry (required)
  }
}

export interface Store {
  id: string;                  // Unique store identifier
  name: string;                // Store name
  logoUrl?: string;            // Logo image URL, optional
  websiteUrl?: string;         // Store website URL, optional
}
