import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CouponVault - Secure Digital Coupon Storage & Management',
    short_name: 'CouponVault',
    description:
      'CouponVault is your secure digital coupon vault for storing, managing, and organizing all your digital coupons in one place. Never miss a discount or lose a coupon again.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#251c16',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: "maskable",
      },
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: "maskable",
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ],
  }
}