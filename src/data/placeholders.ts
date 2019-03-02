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
    termsAndConditions: [
      "Valid for online purchases only at Target.com.",
      "Cannot be combined with other promo codes or storewide discounts.",
      "Not applicable to gift cards, electronics, or pharmacy purchases.",
      "Each customer can use the code once per account.",
      "Offer excludes clearance, bulk, and sale items.",
      "Target reserves the right to change or cancel this offer at any time.",
      "Coupon must be applied before completing the checkout process."
    ]
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
    termsAndConditions: [
      "Eligible for selected home decor and furniture items only.",
      "Not valid in Target stores or on in-store pickup orders.",
      "Coupon will not apply to taxes, shipping, or delivery fees.",
      "Limit one use per customer per promotion period.",
      "May not be redeemed for cash or used on previous purchases.",
      "Returns made using this coupon may forfeit savings.",
      "Void where prohibited or restricted by law."
    ]
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
    termsAndConditions: [
      "Offer valid only for newly listed items in the New Arrivals category.",
      "Not combinable with employee or affiliate discounts.",
      "Maximum discount value: $50 per transaction.",
      "Coupon code must be entered at checkout to receive discount.",
      "Items purchased with coupon are subject to standard return policies.",
      "Not valid on backordered or pre-order items.",
      "Unused portion of the coupon is non-refundable."
    ]
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
    termsAndConditions: [
      "Valid for grocery items only, both online and in participating Walmart stores.",
      "Excludes alcohol, tobacco, and gift cards.",
      "Only one coupon can be applied per order.",
      "Cannot be transferred, sold, or exchanged for cash.",
      "Not valid on third-party marketplace items.",
      "Coupon not valid after expiration date.",
      "Subject to availability of eligible products."
    ]
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
    termsAndConditions: [
      "Valid in-store at participating Walmart locations only.",
      "Discount applied to toys department SKUs only.",
      "This coupon must be presented at time of purchase.",
      "No rain checks or substitutions allowed.",
      "Not valid with any other Walmart promotional offers.",
      "Coupon not redeemable for cash or gift cards.",
      "Offer applies to stock on hand; no special orders."
    ]
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
    termsAndConditions: [
      "Online only at Walmart.com; not valid in physical stores.",
      "Offer available to first-time online customers only.",
      "Coupon excludes select electronics and gift cards.",
      "Each account eligible for single use only.",
      "No cash value; coupon cannot be resold.",
      "Shipping and handling fees are not discounted.",
      "Misuse of coupon may result in order cancellation."
    ]
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
    termsAndConditions: [
      "Discount valid only on headphone products sold by Best Buy.",
      "Not applicable to open-box, refurbished, or clearance items.",
      "Cannot be used with student or military discounts.",
      "Coupon code required at checkout.",
      "Discount does not apply to taxes or shipping fees.",
      "Purchase must be completed before the expiration date.",
      "Best Buy reserves the right to verify eligibility."
    ]
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
    termsAndConditions: [
      "Valid for selected computer accessories: mice, keyboards, monitors.",
      "Offer not valid on bundles, parts, or gaming consoles.",
      "Limit of 2 redemptions per household.",
      "Coupon cannot be combined with Price Match Guarantee.",
      "Online and in-store redemption, where available.",
      "Returns must include the original receipt and all packaging.",
      "Coupon not valid on previous purchases."
    ]
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
    termsAndConditions: [
      "Minimum purchase of $100 before tax required.",
      "Valid on single transaction only; no partial redemptions.",
      "Coupon valid for merchandise purchases only.",
      "Limit one coupon per customer, per order.",
      "Digital products, services, and warranties not eligible.",
      "Cannot be used with other percent-off offers.",
      "All standard Best Buy return policies apply."
    ]
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
    termsAndConditions: [
      "Valid for espresso drinks only; excludes bottled beverages.",
      "Limit one discount beverage per customer per visit.",
      "Must be presented at time of purchase.",
      "Not valid on mobile orders or Starbucks app purchases.",
      "Offer not transferable; no cash or credit back.",
      "Not valid in airport or licensed locations.",
      "Subject to availability of menu items."
    ]
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
    termsAndConditions: [
      "Applicable to bagged coffee and coffee pods purchased in-store or online.",
      "Excludes instant coffee, ready-to-drink, and gift sets.",
      "Cannot be combined with rewards or loyalty member discounts.",
      "Coupon required at time of payment.",
      "Valid only at participating Starbucks locations.",
      "Discount does not apply to taxes.",
      "Quantities may be limited per customer."
    ]
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
    termsAndConditions: [
      "Valid for cold brew beverages only.",
      "Cannot be applied to handmade customizations.",
      "No rain checks; valid while supplies last.",
      "Discount does not apply to Starbucks Reserve stores.",
      "Not combinable with other beverage discounts or coupons.",
      "Redemption limited to one per customer per visit.",
      "Coupon void if altered, copied, or reproduced."
    ]
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
    termsAndConditions: [
      "One-time use per customer per offer period.",
      "Selected prestige brands and products are excluded.",
      "Valid for online orders shipped within the US.",
      "Cannot be used to purchase Ulta gift cards.",
      "Offer not valid on salon or beauty services.",
      "Coupon must be applied before payment is processed.",
      "Ulta reserves the right to revoke coupon in case of fraud."
    ]
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
    termsAndConditions: [
      "Offer valid on select serums and moisturizers only.",
      "Cannot be applied to doorbusters or sale items.",
      "Coupon code is required at checkout.",
      "Returns on discounted items subject to adjusted refund.",
      "Offer valid only during promotional period.",
      "Applies to merchandise subtotal prior to taxes.",
      "Ulta employees are not eligible for this offer."
    ]
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
    termsAndConditions: [
      "Offer valid for select running shoe styles at Nike.com.",
      "Cannot be combined with Nike Membership rewards.",
      "SHOE25 discount cannot be used toward prior purchases.",
      "Limit 2 discounted pairs per customer.",
      "Not valid on Nike gift card purchases.",
      "No substitutions or cash alternative offered.",
      "Void where prohibited or taxed."
    ]
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
    termsAndConditions: [
      "Valid for Nike training apparel only.",
      "Offer may be redeemed online or in-store.",
      "Cannot be combined with other discounts or Nike Member rewards.",
      "Limit one use per customer.",
      "Not valid on prior purchases or gift cards.",
      "No cash value; not redeemable for cash.",
      "Coupon must be presented or entered at checkout.",
      "Nike reserves the right to modify or cancel the offer at any time."
    ]
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
    termsAndConditions: [
      "Valid for online purchases over $60 before taxes and shipping.",
      "Cannot be combined with other promo codes or discounts.",
      "Not valid towards gift cards or previous purchases.",
      "Limit one coupon code per order.",
      "Coupon code must be entered at checkout.",
      "Offer valid through stated expiration date only.",
      "Void where prohibited or restricted by law."
    ]
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
    termsAndConditions: [
      "Valid only on new arrival merchandise at gap.com.",
      "Not valid in Gap Outlet or Factory stores.",
      "Cannot be combined with other percentage-off offers.",
      "Limit one use per customer per promotional period.",
      "Coupon code must be entered at checkout.",
      "Excludes gift cards, sale items, and previous purchases.",
      "No cash value; not transferrable.",
      "Returns may void savings on eligible items."
    ]
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
    termsAndConditions: [
      "Offer valid for select men’s and women’s essentials.",
      "May be used online or in-store at participating Gap locations.",
      "Cannot be combined with other sitewide or storewide offers.",
      "Coupon must be presented or code entered at checkout.",
      "One use per customer; not valid on previous purchases.",
      "No cash back; non-transferable.",
      "Offer subject to change or cancellation at any time."
    ]
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
    termsAndConditions: [
      "Offer valid only on GAPKids merchandise purchased online.",
      "Discount applies to qualifying full-priced items only.",
      "Not valid on clearance or sale items.",
      "Code must be entered at time of purchase.",
      "No cash value; cannot be exchanged for cash or gift cards.",
      "One time use per account.",
      "Returns may forfeit coupon savings.",
      "Offer void where prohibited."
    ]
  },
];
