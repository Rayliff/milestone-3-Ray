"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProduct";
import dynamic from "next/dynamic";

const ProductDetail = dynamic(() => import("@/component/ProductDetail"), {
  loading: () => <p className="text-center mt-10">Memuat detail...</p>
});

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ Fix Next.js new params behavior

  const { product, loading, error } = useProduct(id);

  if (loading) return <p className="text-center mt-10">Loading produk...</p>;
  if (error || !product) return <p className="text-center text-red-500">Produk tidak ditemukan.</p>;

  return (
    <main className="p-6">
      <ProductDetail product={product} />
    </main>
  );
}
