import Link from 'next/link';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Ghost className="h-16 w-16 text-border" strokeWidth={1.5} />
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">404</h1>
        <p className="mt-1 text-sm text-muted">Halaman yang kamu cari gak ketemu — mungkin udah dipindah atau emang gak pernah ada</p>
      </div>
      <Link
        href="/"
        className="mt-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}