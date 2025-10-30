"use client";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartItem({ id, title, price, image, quantity }: Props) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-3 border border-gray-200">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={title}
          width={60}
          height={60}
          className="rounded-md border"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-yellow-600 font-medium">
            $ {price.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => decreaseQty(id)}
              className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition"
            >
              <Minus size={14} />
            </button>
            <span className="font-medium text-black">{quantity}</span>
            <button
              onClick={() => increaseQty(id)}
              className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-gray-700 font-semibold">
          $ {(price * quantity).toLocaleString()}
        </p>

        <button
          onClick={() => removeFromCart(id)}
          className="text-red-500 hover:text-red-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
