"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productSchema, ProductFormData } from "@/lib/validation/productSchema";
import { createProduct, updateProduct } from "@/lib/api";

interface ProductFormProps {
  mode: "create" | "edit";
  id?: string;
  initialData?: ProductFormData;
  onSuccess?: () => void;
}

export function ProductForm({ mode, id, initialData, onSuccess }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {},
  });

  // Isi form jika ada initialData (mode edit)
  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("categoryId", initialData.categoryId ?? 0);
      setValue("images", initialData.images ?? "");
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);

      if (mode === "create") {
        await createProduct(data);
        setMessage("✅ Produk berhasil dibuat!");
      } else if (mode === "edit" && id) {
        await updateProduct(Number(id), data);
        setMessage("✅ Produk berhasil diperbarui!");
      }

      setTimeout(() => {
        onSuccess?.();
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Terjadi kesalahan saat menyimpan produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-black">
        {mode === "create" ? "Tambah Produk" : "Edit Produk"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nama Produk */}
        <div>
          <label className="block font-medium mb-1 text-black">Nama Produk</label>
          <input
            {...register("title")}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="Contoh: Meja Kayu"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Harga */}
        <div>
          <label className="block font-medium mb-1 text-black">Harga</label>
          <input
            type="number"
            {...register("price")}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="Contoh: 50000"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium mb-1 text-black">Deskripsi</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="Tuliskan deskripsi produk..."
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Kategori */}
        <div>
          <label className="block font-medium mb-1 text-black">Kategori (ID)</label>
          <input
            type="number"
            {...register("categoryId")}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="Masukkan ID kategori"
          />
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
        </div>

        {/* Gambar */}
        <div>
          <label className="block font-medium mb-1 text-black">URL Gambar</label>
          <input
            {...register("images")}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="https://example.com/image.jpg"
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
        </div>

        {/* Tombol */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading
            ? "Menyimpan..."
            : mode === "create"
            ? "Tambah Produk"
            : "Simpan Perubahan"}
        </button>
      </form>

      {message && <p className="text-center mt-4 text-green-600">{message}</p>}
    </div>
  );
}
