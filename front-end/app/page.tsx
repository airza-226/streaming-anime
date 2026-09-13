import { HeroCarousel } from "@/components/layout/home/HeroCarousel";
import { TrendingRow } from "@/components/layout/home/TrendingRow";
import Navbar from "@/components/layout/navbar/Navbar";

const featuredList = [
  {
    id: '1',
    title: 'Jujutsu Kaisen',
    synopsis: 'Sinopsis singkat...',
    videoUrl: '/video/shikimori.mp4', // <-- Udah dibenerin
    posterUrl: '/images/featured-poster-1.jpg',
    genres: ['Action', 'Fantasy'],
  },
  {
    id: '2',
    title: 'Shikimori',
    synopsis: 'Sinopsis singkat lainnya...',
    videoUrl: '/video/gojo.mp4', // <-- Udah dibenerin
    posterUrl: '/images/featured-poster-2.jpg',
    genres: ['Drama', 'Romance'],
  },
];
const trending = [
  { id: "1", title: "Anime A", posterUrl: "/images/a.jpg", rating: 8.7 },
  { id: "2", title: "Anime B", posterUrl: "/images/b.jpg", rating: 8.3 },
  // ...
];

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroCarousel items={featuredList} intervalMs={5000} />
      <TrendingRow title="Trending Sekarang" items={trending} />
      {/* row-row lain (New Release, Genre, dll) ditambah di sini nanti */}
    </main>
  );
}
