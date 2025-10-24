"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-6">⏳ Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      <Link
        href="/admin/products/create"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Tambah Produk
      </Link>

      <ul className="mt-4 space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-3 rounded flex justify-between items-center">
            <span>{p.title}</span>
            <Link
              href={`/admin/products/${p.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
