import { LatestUpdateCard } from './LatestUpdateCard';
import { Anime } from '@/types/animeDetail';

type LatestUpdatesGridProps = {
  title: string;
  items: Anime[];
};

export function LatestUpdatesGrid({ title, items }: LatestUpdatesGridProps) {
  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-3 text-lg font-semibold text-foreground sm:mb-4 sm:text-xl">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {items.map((anime) => (
            <LatestUpdateCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </section>
  );
}