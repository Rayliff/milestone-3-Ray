import axios from "axios";
import { Product, ProductFormData } from "@/types/product";

const API_URL = "https://api.escuelajs.co/api/v1/products";

// ✅ Ambil daftar produk
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get(`${API_URL}?offset=0&limit=8`);
    return res.data;
  } catch (err) {
    console.error("❌ Gagal fetch products:", err);
    throw new Error("Failed to fetch products");
  }
};

// ✅ Ambil produk berdasarkan ID
export const getProduct = async (id: number): Promise<Product> => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Gagal fetch product:", err);
    throw new Error("Failed to fetch product");
  }
};

// ✅ Tambah produk baru
export const createProduct = async (data: ProductFormData): Promise<Product> => {
  try {
    const productData = {
      title: data.title,
      price: Number(data.price),
      description: data.description,
      categoryId: data.categoryId ?? 1,
      images: data.images ? [data.images] : ["https://picsum.photos/640/480"],
    };

    const res = await axios.post(API_URL, productData);
    return res.data;
  } catch (err) {
    console.error("❌ Gagal create product:", err);
    throw new Error("Failed to create product");
  }
};

// ✅ Update produk
export const updateProduct = async (
  id: number,
  data: Partial<ProductFormData>
): Promise<Product> => {
  try {
    const productData = {
      title: data.title,
      price: data.price ? Number(data.price) : undefined,
      description: data.description,
      images: data.images ? [data.images] : undefined,
      categoryId: data.categoryId ?? 1,
    };

    const res = await axios.put(`${API_URL}/${id}`, productData);
    return res.data;
  } catch (err) {
    console.error("❌ Gagal update product:", err);
    throw new Error("Failed to update product");
  }
};

// ✅ Hapus produk
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.error("❌ Gagal delete product:", err);
    throw new Error("Failed to delete product");
  }
};

// ✅ Pencarian lokal
export const searchProducts = async (query: string): Promise<Product[]> => {
  // const products = await getProducts();
  const res = await axios.get(`${API_URL}?offset=0&limit=100`);
  const allProducts = res.data as Product[];
  return allProducts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
};
// Note: The API does not support search queries directly, so we fetch all products and filter them locally.