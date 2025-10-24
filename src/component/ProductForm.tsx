// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter, useParams } from "next/navigation";
// import type { ProductFormData } from "@/types/product";
// import { createProduct, updateProduct, getProduct } from "@/lib/api";

// export function ProductForm({ mode }: { mode: "create" | "edit" }) {
//   const router = useRouter();
//   const params = useParams();
//   const id = params?.id as string | undefined;

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ProductFormData>();

//   // Ambil data produk saat mode edit
//   useEffect(() => {
//     if (mode === "edit" && id) {
//       setLoading(true);
//       getProduct(Number(id))
//         .then((data) => {
//           if (data) {
//             setValue("title", data.title);
//             setValue("price", data.price);
//             setValue("description", data.description);
//             setValue("categoryId", data.category?.id ?? 0);
//             setValue("images", data.images?.[0] ?? "");
//           }
//         })
//         .catch(() => setMessage("⚠️ Gagal memuat data produk"))
//         .finally(() => setLoading(false));
//     }
//   }, [id, mode, setValue]);

//   // Saat submit form
//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       setLoading(true);
//       if (mode === "create") {
//         await createProduct(data);
//         setMessage("✅ Produk berhasil dibuat!");
//       } else if (mode === "edit" && id) {
//         await updateProduct(Number(id), data);
//         setMessage("✅ Produk berhasil diperbarui!");
//       }
//       setTimeout(() => router.push("/admin"), 1500);
//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Terjadi kesalahan saat menyimpan produk.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-6">⏳ Loading...</p>;

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 shadow rounded-lg">
//       <h2 className="text-xl font-semibold mb-4 text-center">
//         {mode === "create" ? "Tambah Produk" : "Edit Produk"}
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Nama Produk */}
//         <div>
//           <label className="block font-medium mb-1">Nama Produk</label>
//           <input
//             {...register("title", { required: "Nama produk wajib diisi" })}
//             className="w-full border p-2 rounded"
//             placeholder="Contoh: Meja Kayu"
//           />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//         </div>

//         {/* Harga */}
//         <div>
//           <label className="block font-medium mb-1">Harga</label>
//           <input
//             type="number"
//             {...register("price", { required: "Harga wajib diisi" })}
//             className="w-full border p-2 rounded"
//             placeholder="Contoh: 50000"
//           />
//           {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
//         </div>

//         {/* Deskripsi */}
//         <div>
//           <label className="block font-medium mb-1">Deskripsi</label>
//           <textarea
//             {...register("description", { required: "Deskripsi wajib diisi" })}
//             className="w-full border p-2 rounded"
//             placeholder="Tuliskan deskripsi produk..."
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm">{errors.description.message}</p>
//           )}
//         </div>

//         {/* Kategori */}
//         <div>
//           <label className="block font-medium mb-1">Kategori (ID)</label>
//           <input
//             type="number"
//             {...register("categoryId", { required: "Kategori wajib diisi" })}
//             className="w-full border p-2 rounded"
//             placeholder="Masukkan ID kategori"
//           />
//           {errors.categoryId && (
//             <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
//           )}
//         </div>

//         {/* Gambar */}
//         <div>
//           <label className="block font-medium mb-1">URL Gambar</label>
//           <input
//             {...register("images", { required: "Gambar wajib diisi" })}
//             className="w-full border p-2 rounded"
//             placeholder="https://example.com/image.jpg"
//           />
//           {errors.images && (
//             <p className="text-red-500 text-sm">{errors.images.message}</p>
//           )}
//         </div>

//         {/* Tombol */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading
//             ? "Menyimpan..."
//             : mode === "create"
//             ? "Tambah Produk"
//             : "Simpan Perubahan"}
//         </button>
//       </form>

//       {message && <p className="text-center mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { ProductFormData } from "@/types/product";
import { createProduct, updateProduct, getProduct } from "@/lib/api";

interface ProductFormProps {
  mode: "create" | "edit";
  id?: string; // untuk edit
  initialData?: ProductFormData; // data awal saat edit
  onSuccess?: () => void; // callback opsional
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
  } = useForm<ProductFormData>();

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
        window.location.href = "/admin/products"; // 🟢 redirect setelah create
      } else if (mode === "edit" && id) {
        await updateProduct(Number(id), data);
        setMessage("✅ Produk berhasil diperbarui!");
        window.location.href = "/admin/products"; // 🟢 redirect setelah edit
      }

      // callback atau redirect
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
            {...register("title", { required: "Nama produk wajib diisi" })}
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
            {...register("price", { required: "Harga wajib diisi" })}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="Contoh: 50000"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium mb-1 text-black">Deskripsi</label>
          <textarea
            {...register("description", { required: "Deskripsi wajib diisi" })}
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
            {...register("categoryId", { required: "Kategori wajib diisi" })}
            className="w-full border p-2 rounded text-black placeholder-gray"
            placeholder="Masukkan ID kategori"
          />
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
        </div>

        {/* Gambar */}
        <div>
          <label className="block font-medium mb-1 text-black">URL Gambar</label>
          <input
            {...register("images", { required: "Gambar wajib diisi" })}
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
