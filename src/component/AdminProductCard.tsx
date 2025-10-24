// "use client";

// import { Product } from "@/types/product";
// import Image from "next/image";
// import Link from "next/link";

// interface AdminProductCardProps {
//   product: Product;
//   onDelete?: (id: number) => void;
// }

// export default function AdminProductCard({ product, onDelete }: AdminProductCardProps) {
    
//     const imageSrc = Array.isArray(product.images) && product.images[0]
//   ? product.images[0]
//   : "https://placehold.co/300x200?text=No+Image";
//   return (
//     <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition flex justify-between items-center">
//       <div className="flex gap-4">
//         <div className="relative w-32 h-24 rounded-md overflow-hidden">
//           <Image
//              src={imageSrc}
//              alt={product.title ?? "Produk"}
//              fill
//              className="object-cover rounded-md"
//              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//            />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold">{product.title}</h2>
//           <p className="text-gray-600">$ {product.price.toLocaleString()}</p>
//           <p className="text-sm text-gray-500">{product.category?.name ?? 'No category'}</p>

//         </div>
//       </div>

//       <div className="flex flex-col gap-2">
//         <Link
//           href={`/admin/products/${product.id}/edit`}
//           className="bg-blue-600 text-white px-3 py-1 rounded-md text-center hover:bg-blue-700 transition"
//         >
//           Edit
//         </Link>
//         <button
//           onClick={() => onDelete && onDelete(product.id)}
//           className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/lib/api";
import { useState } from "react";

interface AdminProductCardProps {
  product: Product;
  onDelete?: (id: number) => void;
}

export default function AdminProductCard({ product, onDelete }: AdminProductCardProps) {
  const [loading, setLoading] = useState(false);

  const imageSrc =
    Array.isArray(product.images) && product.images[0]
      ? product.images[0]
      : "https://placehold.co/300x200?text=No+Image";

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    setLoading(true);
    try {
      await deleteProduct(product.id);
      onDelete?.(product.id); // update UI lokal
      alert("Produk berhasil dihapus!");
    } catch (error) {
      alert("Gagal menghapus produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition flex justify-between items-center">
      <div className="flex gap-4">
        <div className="relative w-32 h-24 rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.title ?? "Produk"}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">$ {product.price.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{product.category?.name ?? "No category"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-center hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
