'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';
import { Anime } from '@/types/anime';

type HeroBannerProps = {
  featured: Anime;
};

export function HeroBanner({ featured }: HeroBannerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <video
        key={featured.id}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={featured.posterUrl}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={featured.videoUrl} type="video/mp4" />
      </video>

      {/* mobile: blur cuma nutup ~2/3 bawah (area teks), fade halus ke atas */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 sm:hidden"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, black 35%, transparent 85%)',
          maskImage: 'linear-gradient(to top, black 0%, black 35%, transparent 85%)',
        }}
      />
      {/* desktop: blur strip kiri seperti sebelumnya, video kanan tetap bersih */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-3/5 sm:block"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 70%)',
          maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 70%)',
        }}
      />

      {/* scrim gelap: arah atas-bawah di mobile, kiri-kanan di desktop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent sm:bg-gradient-to-r sm:from-black/90 sm:via-black/30 sm:to-transparent" />

      <div className="absolute inset-0 flex items-end px-4 pb-8 sm:items-center sm:px-6 sm:pb-0 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-xl"
          >
            {featured.genres && (
              <div className="mb-2 flex flex-wrap gap-2 sm:mb-3">
                {featured.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl lg:text-6xl">
              {featured.title}
            </h1>

            <p className="mt-2 line-clamp-2 max-w-md text-xs text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] sm:mt-4 sm:line-clamp-3 sm:text-sm md:text-base">
              {featured.synopsis}
            </p>

            <div className="mt-4 flex items-center gap-2 sm:mt-6 sm:gap-3">
              <button
                className={clsx(
                  'flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2.5',
                  'text-xs font-bold uppercase tracking-wide text-white',
                  'transition-colors hover:bg-orange-600 sm:px-6 sm:py-3 sm:text-sm'
                )}
              >
                <Play className="h-4 w-4 fill-white sm:h-5 sm:w-5" />
                Tonton E1
              </button>

              <button
                aria-label="Info anime"
                className={clsx(
                  'flex h-9 w-9 items-center justify-center rounded-md',
                  'border-2 border-orange-500 text-orange-500',
                  'transition-colors hover:bg-orange-500/10 sm:h-11 sm:w-11'
                )}
              >
                <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Nyalakan suara' : 'Matikan suara'}
        className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:bottom-8 sm:right-8 sm:h-10 sm:w-10"
      >
        {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
      </button>
    </section>
  );
}