"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { getProducts, searchProducts } from "@/lib/api";
import ProductCard from "@/component/ProductCard";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = query ? await searchProducts(query) : await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  return (
    <main className="p-4">
      {loading && <p className="text-center mt-10">Loading produk...</p>}
      {!loading && products.length === 0 && (
        <p className="text-center mt-10 text-gray-600">Produk tidak ditemukan.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!loading &&
          products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">⏳ Memuat halaman...</p>}>
      <ProductList />
    </Suspense>
  );
}
