"use client";

export default function ErrorPage({ error, reset }: any) {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
      <p className="mb-4 text-gray-600">{error?.message ?? "Something went wrong"}</p>

      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Coba Lagi
      </button>
    </div>
  );
}
