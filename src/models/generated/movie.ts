import * as z from "zod"

export const MovieSchema = z.object({
  id: z.number().int(),
  imdb_id: z.string().nullish(),
  title: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
  overview: z.string(),
  genres: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
