"use client";

import { useCart } from "@/context/CartContext";
import { clear } from "console";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  const router = useRouter();

  const handlePayment = () => {
    alert("✅ Pembayaran berhasil!");
    clearCart();
    router.push("/success"); // bisa ganti ke home jika mau
  };

  if (!items.length) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold mb-2">Keranjang Kosong 😢</h1>
        <a href="/products" className="underline text-blue-600">
          Belanja sekarang
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2 border-b pb-2">
          <span>{item.title}</span>
          <span>$ {item.price * item.quantity}</span>
        </div>
      ))}

      <div className="font-bold text-lg mt-4">
        Total: $ {totalPrice()}
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        Bayar Sekarang
      </button>
    </div>
  );
}
