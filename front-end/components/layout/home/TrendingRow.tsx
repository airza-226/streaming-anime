import { AnimeCard, } from './AnimeCard';
import { Anime } from '@/types/animeDetail';
type TrendingRowProps = {
  title: string;
  items: Anime[];
};

export function TrendingRow({ title, items }: TrendingRowProps) {
  return (
    <section className="relative z-10 md:mt-5 px-4 sm:mt-24 sm:px-2 md:px-3">
      <div className="mx-auto rounded-xl ">
        <h2 className="mb-3 text-lg font-semibold text-foreground sm:text-xl px-1 pt-2">{title}</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none sm:gap-4 [&::-webkit-scrollbar]:hidden px-2 ">
          {items.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </section>
  );
}