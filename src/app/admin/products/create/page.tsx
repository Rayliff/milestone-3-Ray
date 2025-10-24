"use client";

import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";
import { ProductForm } from "@/component/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createProduct(data);
      alert("Produk berhasil dibuat!");
      router.push("/admin/products");
    } catch (err) {
      alert("Gagal membuat produk");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <ProductForm mode="create" />
    </main>
  );
}
