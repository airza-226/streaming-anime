import {z} from "zod"
export const createAnimeSchema = z.object({
    body:z.object({
        title:z.string().min(1,"Title is required"),
        description:z.string().optional(),
        status:z.enum(["ongoing","completed","upcoming"]).optional(),
        releaseYear:z.number().int().positive().optional(),
        coverImage:z.string().url("Invalid image URL format").optional()
    })
})

export const updateAnimeSchema = z.object({
    body:z.object({
        title:z.string().min(1).optional(),
        description:z.string().optional(),
        status:z.enum(["ongoing","completed","upcoming"]).optional(),
        releaseYear:z.number().int().positive().optional(),
        coverImage:z.string().url().optional()
    })
})