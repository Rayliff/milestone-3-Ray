## Demo Website

You can view the project deployment and status on Vercel here:  
🔗 [RevoShop on Vercel](https://milestone-3-ray-lkh5.vercel.app/)

Overview

Project ini adalah aplikasi e-commerce sederhana yang dibangun menggunakan Next.js 14 App Router.
Aplikasi ini memungkinkan pengguna untuk:

Melihat daftar produk

Melihat detail produk

Melakukan pencarian produk

Menambahkan produk ke cart (dummy)

Melakukan checkout (dummy)

Login untuk akses halaman admin

CRUD produk dari panel admin

Server-side rendering (SSR) + ISR untuk optimasi

Proyek ini dibuat untuk latihan web development modern dengan Next.js dan API eksternal.

✨ Features Implemented
👤 User Features

✅ Browse Product List
✅ Search product by keyword
✅ View product detail
✅ Add to cart (dummy)
✅ Checkout simulation (with success alert)

🔐 Authentication

✅ Login page (mock login)
✅ Protected admin routes

🛠️ Admin Panel

✅ Dashboard admin
✅ Create new product
✅ Edit product
✅ Delete product
✅ List products in admin
✅ Data fetching hooks (useProducts & useProduct)

⚙️ System Features

✅ CSR, SSR, ISR mix usage
✅ Loading & error state
✅ Responsive UI

🧰 Technologies Used
Category	Tech
Framework	Next.js 14 (App Router)
Styling	Tailwind CSS
API	Platzi Fake Store API
Auth	Client-side mock auth (useLocalStorage)
State Mgmt	React Hooks
Data Fetch	fetch(), dynamic & static rendering
Icons	Lucide-React
UI Components	Custom components
📂 Project Structure (simplified)
src/
 ┣ app/
 ┃ ┣ products/
 ┃ ┃ ┣ [id]/page.tsx
 ┃ ┃ ┗ page.tsx
 ┃ ┣ admin/
 ┃ ┃ ┣ products/
 ┃ ┃ ┃ ┣ new/page.tsx
 ┃ ┃ ┃ ┗ [id]/edit/page.tsx
 ┃ ┃ ┗ page.tsx
 ┃ ┗ login/page.tsx
 ┣ components/
 ┃ ┣ ProductCard.tsx
 ┃ ┣ ProductListClient.tsx
 ┃ ┗ ProductDetail.tsx
 ┣ hooks/
 ┃ ┣ useProduct.ts
 ┃ ┗ useProducts.ts
 ┗ lib/
   ┗ api.ts

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# milestone-3-Rayliff
