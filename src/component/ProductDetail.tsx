// src/component/ProductDetail.tsx
"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const fallback = "https://placehold.co/500x400?text=No+Image";
  const [imgSrc, setImgSrc] = useState(
    Array.isArray(product.images) && product.images[0] ? product.images[0] : fallback
  );

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            className="object-cover"
            onError={() => setImgSrc(fallback)} // ✅ kalau gambar error, pasang fallback
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-sm text-yellow-600 mb-3">
              {product.category?.name || "Tanpa Kategori"}
            </p>
            <p className="text-xl font-bold text-yellow-500 mb-4">
              $ {product.price.toLocaleString()}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </p>
          </div>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition">
            Tambah ke Keranjang 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
