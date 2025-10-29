import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

describe("CartContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: 1,
        title: "Product 1",
        price: 100,
        image: "img.jpg",
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it("removes item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: 1,
        title: "Product 1",
        price: 100,
        image: "img.jpg",
      });
      result.current.removeFromCart(1);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("calculates total price", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: 1,
        title: "A",
        price: 50,
        image: "a.jpg",
      });
      result.current.addToCart({
        id: 2,
        title: "B",
        price: 150,
        image: "b.jpg",
      });
    });

    expect(result.current.totalPrice()).toBe(200);
  });
});
