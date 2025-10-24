"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import AdminProductCard from "./AdminProductCard";

type Props = {
  initialProducts: Product[];
};

export default function AdminProductList({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <AdminProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
