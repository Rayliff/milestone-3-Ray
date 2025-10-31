export const revalidate = 60;

import ProductListClient from "@/component/ProductListClient";

export default function HomePage() {
  return (
    <main className="p-4">
      <ProductListClient />
    </main>
  );
}
