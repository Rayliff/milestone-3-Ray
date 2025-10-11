"use client"

import { Product } from "@/types/product";
import Image from 'next/image';
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = Array.isArray(product.images) && product.images[0]
  ? product.images[0]
  : "https://placehold.co/300x200?text=No+Image";

  return (
    <div className="border border-yellow-400 bg-yellow-50 rounded-xl shadow-md p-4 hover:shadow-lg transition">

      <div className="relative w-full h-48 mb-2">
        <Image
          src={imageSrc}
          alt={product.title ?? "Produk"}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <h2 className="text-lg font-bold text-yellow-600 mb-1">
        {product.title}
      </h2>
      <p className="text-yellow-600 font-medium mb-2">
        $ {product.price.toLocaleString()}
      </p>

      <Link
        href={`/products/${product.id}`}
        className="inline-block mt-2 bg-yellow-500 text-white px-3 py-2 rounded-md text-center hover:bg-yellow-600 transition w-full"
      >
        Lihat Detail →
      </Link>
    </div>
  );
}