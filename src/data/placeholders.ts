import { Coupon, Store } from "@/lib/types";

// Store and default coupon data
export const stores: Store[] = [
  {
    id: "target",
    name: "Target",
    logoUrl:
      "https://cdn.brandfetch.io/id0ZfAM4Dt/w/240/h/240/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667573192808",
    colorPalette: {
      background: ["#CC0000", "#990000"],
      foreground: ["#FFFFFF", "#F2F2F2"],
    },
  },
  {
    id: "walmart",
    name: "Walmart",
    logoUrl:
      "https://cdn.brandfetch.io/idoGsFQrHx/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1736912992509",
    colorPalette: {
      background: ["#F7B400", "#0071CE"],
      foreground: ["#2E2E2E", "#FFFFFF"],
    },
  },
  {
    id: "best_buy",
    name: "Best Buy",
    logoUrl:
      "https://cdn.brandfetch.io/idmSVs_Vxg/w/480/h/480/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1761207107240",
    colorPalette: {
      background: ["#FFE000", "#003087"],
      foreground: ["#001A34", "#FFFFFF"],
    },
  },
  {
    id: "starbucks",
    name: "Starbucks",
    logoUrl:
      "https://cdn.brandfetch.io/idwBSkfVb3/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1727716459197",
    colorPalette: {
      background: ["#00704A", "#1E3932"],
      foreground: ["#FFFFFF", "#F4F4F2"],
    },
  },
  {
    id: "ulta_beauty",
    name: "Ulta Beauty",
    logoUrl:
      "https://cdn.brandfetch.io/idBv2IbOz2/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667580295387",
    colorPalette: {
      background: ["#FF6F00", "#A34F1F"],
      foreground: ["#FFFFFF", "#FFF8F0"],
    },
  },
  {
    id: "nike",
    name: "Nike",
    logoUrl:
      "https://cdn.brandfetch.io/id_0dwKPKT/w/399/h/399/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1741746473623",
    colorPalette: {
      background: ["#FFFFFF", "#111111"],
      foreground: ["#111111", "#FFFFFF"],
    },
  },
  {
    id: "gap",
    name: "GAP",
    logoUrl:
      "https://cdn.brandfetch.io/idgoQYa6uK/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1674701440935",
    colorPalette: {
      background: ["#002244", "#141823"],
      foreground: ["#FFFFFF", "#F6F6F6"],
    },
  },
];

export const DEFAULT_COUPONS: Coupon[] = [
  // (Coupon data omitted for brevity)
  // ... Keep as is ...
  {
    id: "TGT10",
    storeId: "target",
    code: "SPRING10",
    discount: { type: "percent", value: 10 },
    discountDescription:
      "Enjoy 10% off your entire Target purchase while you refresh pantry staples and save across the whole cart for a fully stocked home.",
    suggestedSpend: { amount: 60, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 30,
      currency: "USD",
      description: "Minimum spend $30",
    },
    expiration: { endDate: "2025-01-31" },
  },
  {
    id: "TGT15",
    storeId: "target",
    code: "TARGET15",
    discount: { type: "percent", value: 15 },
    discountDescription:
      "Enjoy 15% off select home items at Target as you give your living room a quick glow up with extra savings and a fresh seasonal vibe.",
    suggestedSpend: { amount: 80, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 50,
      currency: "USD",
      description: "Minimum spend $50",
    },
    eligibleItemsDescription: "Home decor & furniture",
    expiration: { endDate: "2024-10-31" },
  },
  {
    id: "TGT20",
    storeId: "target",
    code: "SAVE20TGT",
    discount: { type: "percent", value: 20 },
    discountDescription:
      "Enjoy 20% off new arrivals at Target so you can try the latest collections and snag an instant 20% off with every cart refresh.",
    suggestedSpend: { amount: 75, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Only for newly listed items",
    expiration: { endDate: "2024-08-31" },
  },

  // Walmart (3 coupons)
  {
    id: "WMT12",
    storeId: "walmart",
    code: "WMALL12",
    discount: { type: "percent", value: 12 },
    discountDescription:
      "Enjoy 12% off groceries at Walmart and stretch the weekly food budget on every run without trimming the list.",
    suggestedSpend: { amount: 120, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Groceries only",
    expiration: { endDate: "2024-09-30" },
  },
  {
    id: "WMT10TOYS",
    storeId: "walmart",
    code: "TOYDEAL10",
    discount: { type: "percent", value: 10 },
    discountDescription:
      "Enjoy 10% off toys at Walmart and surprise the kids with markdowns on their favorite characters and playsets all season.",
    suggestedSpend: { amount: 90, currency: "USD" },
    redemptionMethod: "inStore",
    eligibleItemsDescription: "Toys department only",
    expiration: { endDate: "2024-12-31" },
  },
  {
    id: "WMT5",
    storeId: "walmart",
    code: "WELCOME5",
    discount: { type: "percent", value: 5 },
    discountDescription:
      "Enjoy 5% off any order at Walmart.com by applying this welcome perk to any online basket for an instant win.",
    suggestedSpend: { amount: 60, currency: "USD" },
    redemptionMethod: "online",
    expiration: { endDate: "2024-12-15" },
  },

  // Best Buy (3 coupons)
  {
    id: "BBY20",
    storeId: "best_buy",
    code: "TECH20",
    discount: { type: "percent", value: 20 },
    discountDescription:
      "Enjoy 20% off headphones at Best Buy and upgrade your listening setup with quick savings on audio gear and accessories.",
    suggestedSpend: { amount: 150, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Headphones only",
    expiration: { endDate: "2024-10-10" },
  },
  {
    id: "BBY15",
    storeId: "best_buy",
    code: "SAVE15BBY",
    discount: { type: "percent", value: 15 },
    discountDescription:
      "Enjoy 15% off any computer accessory so you can grab fresh gear for the desk without paying full price for the upgrade.",
    suggestedSpend: { amount: 110, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Mice, keyboards, monitors",
    expiration: { endDate: "2024-12-31" },
  },
  {
    id: "BBY10",
    storeId: "best_buy",
    code: "BBY10DEAL",
    discount: { type: "percent", value: 10 },
    discountDescription:
      "Enjoy 10% off your next purchase at Best Buy and cover that next tech splurge with an easy 10% drop on checkout.",
    suggestedSpend: { amount: 200, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 100,
      currency: "USD",
      description: "Min spend $100",
    },
    expiration: { endDate: "2025-01-10" },
  },

  // Starbucks (3 coupons)
  {
    id: "SBX5",
    storeId: "starbucks",
    code: "CUP5OFF",
    discount: { type: "percent", value: 5 },
    discountDescription:
      "Enjoy 5% off in-store drinks at Starbucks and pick up your daily latte with a little bonus savings for every coffee run.",
    suggestedSpend: { amount: 15, currency: "USD" },
    redemptionMethod: "inStore",
    eligibleItemsDescription: "All espresso drinks",
    expiration: { endDate: "2024-07-31" },
  },
  {
    id: "SBX8",
    storeId: "starbucks",
    code: "BEANS8",
    discount: { type: "percent", value: 8 },
    discountDescription:
      "Enjoy 8% off bagged coffee at Starbucks so you can stock the pantry with beans and keep mornings smooth and energized.",
    suggestedSpend: { amount: 35, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Bagged coffee and coffee pods",
    expiration: { endDate: "2024-09-30" },
  },
  {
    id: "SBX10",
    storeId: "starbucks",
    code: "COLD10",
    discount: { type: "percent", value: 10 },
    discountDescription:
      "Enjoy 10% off cold brews at Starbucks and cool down with a chilly sip while shaving a bit off every total.",
    suggestedSpend: { amount: 20, currency: "USD" },
    redemptionMethod: "inStore",
    eligibleItemsDescription: "Cold brew beverages",
    expiration: { endDate: "2024-08-31" },
  },

  // Ulta Beauty (2 coupons)
  {
    id: "ULTA20",
    storeId: "ulta_beauty",
    code: "ULTA20",
    discount: { type: "percent", value: 20 },
    discountDescription:
      "Enjoy 20% off any one qualifying item and treat yourself to a prestige pick-me-up while taking 20% off the glam splurge.",
    suggestedSpend: { amount: 70, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "See Ulta exclusions for prestige brands",
    expiration: { endDate: "2024-11-30" },
  },
  {
    id: "ULTA15SKIN",
    storeId: "ulta_beauty",
    code: "SKIN15",
    discount: { type: "percent", value: 15 },
    discountDescription:
      "Enjoy 15% off selected skincare at Ulta and refresh your shelf with a tidy discount on serums and moisturizers.",
    suggestedSpend: { amount: 85, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Serums & moisturizers",
    expiration: { endDate: "2024-09-15" },
  },

  // Nike (3 coupons)
  {
    id: "NIKE25",
    storeId: "nike",
    code: "RUN25",
    discount: { type: "percent", value: 25 },
    discountDescription:
      "Enjoy 25% off all running shoes so you can lace up new runners and slice a quarter off the tag on every pace.",
    suggestedSpend: { amount: 130, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "Running shoes",
    expiration: { endDate: "2024-08-31" },
  },
  {
    id: "NIKE10",
    storeId: "nike",
    code: "TRAIN10",
    discount: { type: "percent", value: 10 },
    discountDescription:
      "Enjoy 10% off new training gear and refresh the workout wardrobe with an easy savings boost on every outfit.",
    suggestedSpend: { amount: 95, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Nike training apparel",
    expiration: { endDate: "2024-12-31" },
  },
  {
    id: "NIKE15",
    storeId: "nike",
    code: "NKYFALL15",
    discount: { type: "percent", value: 15 },
    discountDescription:
      "Enjoy 15% off any purchase over $60 and grab seasonal gear while unlocking extra savings past the sixty-dollar mark.",
    suggestedSpend: { amount: 120, currency: "USD" },
    redemptionMethod: "online",
    minimumRequirement: {
      amount: 60,
      currency: "USD",
      description: "Min spend $60",
    },
    expiration: { endDate: "2024-10-01" },
  },

  // Gap (3 coupons)
  {
    id: "GAP20",
    storeId: "gap",
    code: "GAPNEW20",
    discount: { type: "percent", value: 20 },
    discountDescription:
      "Enjoy 20% off new arrivals at GAP and ease into new-season fits with generous savings on every fresh drop.",
    suggestedSpend: { amount: 100, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "New arrivals only",
    expiration: { endDate: "2024-09-30" },
  },
  {
    id: "GAP15",
    storeId: "gap",
    code: "GAPESS15",
    discount: { type: "percent", value: 15 },
    discountDescription:
      "Enjoy 15% off essentials at GAP and re-up on daily basics while keeping a tidy slice of savings in your pocket.",
    suggestedSpend: { amount: 80, currency: "USD" },
    redemptionMethod: "both",
    eligibleItemsDescription: "Men’s and women’s essentials",
    expiration: { endDate: "2024-10-31" },
  },
  {
    id: "GAP10",
    storeId: "gap",
    code: "GAPKIDS10",
    discount: { type: "percent", value: 10 },
    discountDescription:
      "Enjoy 10% off GAPKids and outfit the little ones with a friendly markdown on the pieces they reach for daily.",
    suggestedSpend: { amount: 70, currency: "USD" },
    redemptionMethod: "online",
    eligibleItemsDescription: "GAPKids collection",
    expiration: { endDate: "2024-12-31" },
  },
];
