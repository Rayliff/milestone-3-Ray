import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Nama produk wajib diisi"),
  price: z.coerce.number().positive("Harga harus lebih dari 0"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  categoryId: z.coerce.number().min(1, "Kategori wajib diisi"),
  images: z.string().url("URL gambar tidak valid"), // ✅ disamakan dengan field di form
});

export type ProductFormData = z.infer<typeof productSchema>;
