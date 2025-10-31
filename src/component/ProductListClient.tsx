"use client";

import { useProducts } from "@/hooks/useProducts";
import { searchProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductListClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products: defaultProducts, loading, error } = useProducts();

  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // ✅ jika ada query, lakukan search
  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) {
        setSearchResults(null);
        return;
      }

      setSearchLoading(true);
      const results = await searchProducts(query);
      setSearchResults(results);
      setSearchLoading(false);
    };

    fetchSearch();
  }, [query]);

  // ✅ ketika search sedang berjalan
  if (searchLoading) return <p className="text-center mt-10">Mencari produk...</p>;

  // ✅ jika ada query dan hasil kosong
  if (query && searchResults?.length === 0)
    return <p className="text-center mt-10">Produk "{query}" tidak ditemukan.</p>;

  // ✅ tampilkan hasil search
  if (query && searchResults)
    return (
      <div>
        <p className="mb-4">
          Hasil pencarian untuk: <b>{query}</b>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );

  // ✅ jika tidak searching, tampilkan data default
  if (loading) return <p className="text-center mt-10">Loading produk...</p>;
  if (error) return <p className="text-center text-red-500">Gagal memuat produk</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {defaultProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
