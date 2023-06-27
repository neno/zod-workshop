import * as z from "zod"

export const movieSchema = z.object({
  id: z.number().int(),
  imdb_id: z.string().nullish(),
  title: z.string(),
  tagline: z.string().nullish(),
  poster_path: z.string().nullish(),
  release_date: z.string(),
  runtime: z.number().int().nullish(),
  overview: z.string(),
  genres: z.string(),
  budget: z.number().int().nullish(),
  revenue: z.number().int().nullish(),
  homepage: z.string().nullish(),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
