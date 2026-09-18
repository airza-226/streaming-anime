import { AnimeGenre } from '@/types/animeDetail'
import React from 'react'
type genreSelect ={
    genre:AnimeGenre
    onSelect:()=> void
}
const GenreFilter = ({genre,onSelect}:genreSelect) => {
  return (
    <button className="bg-surface rounded-xl w-3 h-1" onClick={()=>onSelect(genre)}>
        <span className="text-sm text-muted font-normal leading-relaxed">
            {genre}
        </span>
    </button>
  )
}

export default GenreFilter