// app/faq/page.tsx
export const metadata = {
  title: "FAQ",
};

export default function FAQPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>

      <details className="p-4 border rounded-lg mb-2">
        <summary className="font-semibold cursor-pointer">
          Bagaimana cara membeli produk?
        </summary>
        <p className="mt-2 text-sm">
          Tambahkan produk ke keranjang lalu menuju halaman checkout.
        </p>
      </details>

    </div>
  );
}
