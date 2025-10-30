export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="mb-4 text-gray-600">
        Maaf, halaman yang kamu cari tidak ditemukan.
      </p>
      <a href="/" className="text-blue-600 underline">
        Kembali ke Beranda
      </a>
    </div>
  );
}
