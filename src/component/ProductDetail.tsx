// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { getProduct } from "@/lib/api";
// import { Product } from "@/types/product";

// export default function ProductDetail() {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const params = useParams();
//   const router = useRouter();
//   const productId = params?.id as string;

//   useEffect(() => {
//     async function fetchProductData() {
//       try {
//         setLoading(true);
//         const data = await getProduct(Number(productId));
//         setProduct(data);
//       } catch (err) {
//         console.error("Gagal mengambil data produk:", err);
//         setError("Produk tidak ditemukan atau gagal dimuat.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (productId) fetchProductData();
//   }, [productId]);

//   if (loading) return <p className="text-center mt-10">Memuat detail produk...</p>;

//   if (error || !product) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-red-500 mb-4">{error}</p>
//         <button
//           onClick={() => router.push("/products")}
//           className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
//         >
//           Kembali ke Produk
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <button
//         onClick={() => router.back()}
//         className="text-blue-600 hover:underline mb-4 inline-block"
//       >
//         ← Kembali
//       </button>

//       <div className="grid md:grid-cols-2 gap-8">
//         <img
//           src={
//             product.images && product.images.length > 0
//               ? product.images[0]
//               : "https://placehold.co/500x400"
//           }
//           alt={product.title}
//           className="rounded-lg shadow-md object-cover w-full h-96"
//         />

//         <div>
//           <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
//           <p className="text-gray-600 mb-4">
//             {product.category?.name || "Tanpa Kategori"}
//           </p>

//           <p className="text-xl font-bold text-green-600 mb-4">
//             Rp {product.price.toLocaleString()}
//           </p>

//           <p className="text-gray-700 leading-relaxed mb-6">
//             {product.description || "Tidak ada deskripsi untuk produk ini."}
//           </p>

//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
//           >
//             Tambah ke Keranjang
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/component/ProductDetail.tsx
"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const fallback = "https://placehold.co/500x400?text=No+Image";
  const [imgSrc, setImgSrc] = useState(
    Array.isArray(product.images) && product.images[0] ? product.images[0] : fallback
  );

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            className="object-cover"
            onError={() => setImgSrc(fallback)} // ✅ kalau gambar error, pasang fallback
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-sm text-yellow-600 mb-3">
              {product.category?.name || "Tanpa Kategori"}
            </p>
            <p className="text-xl font-bold text-yellow-500 mb-4">
              $ {product.price.toLocaleString()}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </p>
          </div>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition">
            Tambah ke Keranjang 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
