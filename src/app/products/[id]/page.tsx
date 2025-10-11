import ProductDetail from "@/component/ProductDetail";
import { getProduct } from "@/lib/api";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params; // ✅ Wajib di-await di Next 15+

  let product;
  try {
    product = await getProduct(Number(id));
  } catch (err) {
    console.error("Gagal fetch product:", err);
    product = null;
  }

  if (!product) {
    return (
      <p className="text-center mt-8 text-red-500">
        Produk tidak ditemukan.
      </p>
    );
  }

  return (
    <main className="p-6">
      <ProductDetail product={product} />
    </main>
  );
}