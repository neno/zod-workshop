import * as z from "zod"

export const MovieSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  imdb_id: z.string().nullish(),
  poster_path: z.string().nullish(),
  release_date: z.string().nullish(),
  overview: z.string().nullish(),
  genres: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
