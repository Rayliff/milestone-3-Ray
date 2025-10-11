// src/app/admin/page.tsx
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import AdminProductCard from "@/component/AdminProductCard";
import Link from "next/link";

export const revalidate = 60; // ISR valid karena ini server component

export default async function AdminHome() {
  const products: Product[] = await getProducts();

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin: Kelola Produk</h1>
        <Link
          href="/admin/products/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
