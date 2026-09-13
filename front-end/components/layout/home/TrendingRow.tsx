import { AnimeCard, } from './AnimeCard';
import { Anime } from '@/types/anime';
type TrendingRowProps = {
  title: string;
  items: Anime[];
};

export function TrendingRow({ title, items }: TrendingRowProps) {
  return (
    <section className="relative z-10 mt-5 px-4 sm:-mt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-3 text-lg font-semibold text-foreground sm:text-xl">{title}</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:gap-4 [&::-webkit-scrollbar]:hidden">
          {items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </section>
  );
}