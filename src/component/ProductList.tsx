"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=8")
      .then((res) => res.json())
      .then((data) => {
        // pastikan setiap product punya gambar yang valid
        const safe = data.map((p: any) => ({
          ...p,
          images: Array.isArray(p.images) && p.images.length > 0
            ? p.images
            : ["https://placehold.co/300x200?text=No+Image"],
        }));
        setProducts(safe);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading produk...</p>;

  if (products.length === 0) {
    return <p className="text-center mt-10">Tidak ada produk tersedia.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}