
import {Anime} from "types/anime"
type AnimeCardProps = {
  anime: Anime;
};

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="group w-36 shrink-0 cursor-pointer sm:w-44">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow">
        <img src={anime.posterUrl} alt={anime.title} className="h-full w-full object-cover" />
        {anime.rating && (
          <span className="absolute right-2 top-2 rounded-full bg-background/70 px-2 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm">
            ★ {anime.rating}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-1 text-sm font-medium text-foreground">{anime.title}</p>
    </div>
  );
}