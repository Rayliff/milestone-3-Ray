import { getProduct } from "@/lib/api";
import { ProductForm } from "@/component/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(Number(id));

  // 🧩 Konversi Product -> ProductFormData
  const formData = {
    title: product.title,
    price: product.price,
    description: product.description,
    categoryId: product.category?.id ?? 0,
    images: product.images?.[0] ?? "",
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
      <ProductForm mode="edit" id={id} initialData={formData} />
    </main>
  );
}
