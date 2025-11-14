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
  listSummary?: string          // Short blurb used in list cards
  suggestedSpend?: {
    amount: number              // Suggested spend to highlight potential savings
    currency?: string           // Currency for the suggested spend
    description?: string        // Optional helper text for UI
  }
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

  /**
   * Store color palette for light and dark mode.
   * Both background and foreground colors in a single object.
   * Example:
   *   colorPalette: {
   *     background: ["#ffffff", "#000000"],      // background color [light, dark]
   *     foreground: ["#111111", "#eeeeee"],      // text/icon color [light, dark]
   *   }
   * Usage example:
   *   { backgroundColor: store.colorPalette?.background[isDarkMode ? 1 : 0],
   *     color: store.colorPalette?.foreground[isDarkMode ? 1 : 0] }
   */
  colorPalette?: {
    background: [string, string];      // background color [light, dark]
    foreground: [string, string];      // foreground color [light, dark]
  };
}
