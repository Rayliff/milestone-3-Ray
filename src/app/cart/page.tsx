"use client";
import { useCart } from "@/context/CartContext";
import CartItem from "@/component/CartItem";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-black">Keranjang Belanja</h1>

      {items.length === 0 ? (
        <p className="text-black text-center">Keranjang masih kosong.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl text-black font-semibold">Total:</h2>
            <p className="text-xl font-bold text-yellow-700">
              Rp {totalPrice().toLocaleString()}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            Hapus Semua
          </button>
        </>
      )}
    </div>
  );
}
