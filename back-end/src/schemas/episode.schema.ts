import {z} from 'zod'
export const createEpisodeSchema = z.object({
    body:z.object({
        animeId:z.string().min(1,'Anime ID is required'),
        episodeNumber:z.number().positive('Episode number must be greater than 0'),
        title:z.string().min(1,'Title is required'),
        videoUrl: z.url({ message: 'Invalid video URL format' })

    })
})