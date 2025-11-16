<!-- Project Title -->
# Coupon Code Vault

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-blue?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.9-38b2ac?logo=tailwindcss)
![PWA](https://img.shields.io/badge/PWA-Progressive%20Web%20App-orange?logo=pwa)
![License](https://img.shields.io/badge/license-MIT-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

<br/>

<img src="https://user-images.githubusercontent.com/6137112/283260874-6dc8ea19-5c7d-457b-8bb7-0ee7f9691c93.png" alt="Project Mock UI" width="700" />

---

## ✨ Overview

**My Coupon code vault** is a modern portfolio and coupon aggregation app, built as a **Progressive Web App (PWA)** using [Next.js](https://nextjs.org/), [React 19](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). It provides a slick, installable interface for browsing and managing promotional deals from various stores—online or offline, on desktop or mobile.

🔸 Sleek and responsive, installable PWA experience  
🔸 Coupons are grouped & filtered by store  
🔸 Interactive countdown timer for deals  
🔸 Optimized for performance, accessibility & offline use  
🔸 Easily customizable and extendable codebase

---

## 🚀 Features

- **Store-based Coupon Listing:** View latest coupons, grouped by brand/store, with easy navigation.
- **Live Countdown Timer:** Each coupon shows time to expiration in real-time.
- **Carousel Navigation:** Snap carousel at the top for quick store selection.
- **Detailed Terms:** Tap or hover to view full coupon T&Cs and details.
- **Responsive UI:** Looks great on desktop _and_ mobile.
- **PWA Ready:** Install to your home screen, enjoy an app-like experience, and access coupons offline.
- **TypeScript & React 19:** Modern patterns and hooks for maintainability.
- **Tailwind CSS:** For utility-first, rapid styling and theming.

---

## 🖼️ Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/6137112/283260962-3e044960-6a9b-418e-8509-5c69f1c4a9c3.png" width="400" alt="Mobile Screenshot" />
  <img src="https://user-images.githubusercontent.com/6137112/283261094-673b2dce-ff2d-4c62-8e0e-a93b2100bde6.png" width="400" alt="Desktop Screenshot" />
</p>

---

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** _(with PWA support)_
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- [Lucide React](https://lucide.dev/)
- [date-fns](https://date-fns.org/)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives/overview/introduction)

_See `package.json` for the full list of dependencies!_

---

## ⚡ Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/my-v0-project.git
   cd my-v0-project
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or, if you use npm
   # npm install
   # or with yarn
   # yarn install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   # or: npm run dev
   ```

4. **Open in your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) to see the app!

5. **Install as a PWA:**  
   When prompted, add to your home screen or install the app for an offline, native-like experience.

---

## 📂 Project Structure

```
src/
  app/
    page.tsx         # The main page and store/coupon rendering logic
  components/        # Reusable, typed React components (CouponListCard, CountdownTimer, Carousel, etc)
  data/              # Example coupon and store placeholder data
  hooks/             # Custom React hooks, e.g., for managing coupons
  lib/               # Utility functions (e.g., grouping coupons)
  styles/            # Tailwind setup and global styles
```

---

## 📝 Customization & Extending

- **Add Stores/Coupons:**  
  Add or edit the data in `src/data/placeholders.ts`.
- **Styling:**  
  Modify Tailwind classes in components, or edit tailwind config as needed.
- **New Features:**  
  Create new React components in `src/components`.

---

## 🙏 Credits

Thanks to [Radix UI](https://www.radix-ui.com/) and [Lucide Icons](https://lucide.dev/) for acceleration and design inspiration.

---

## 🛡️ License

MIT — free to use, fork, and extend.

---

## 💬 Feedback

Have an idea or find a bug?  
Feel free to open an [issue](https://github.com/your-username/my-v0-project/issues) or submit a PR!

<p align="center">
  <img src="https://user-images.githubusercontent.com/6137112/283261094-673b2dce-ff2d-4c62-8e0e-a93b2100bde6.png" width="100" alt="" />
</p>
