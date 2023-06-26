import * as z from "zod"
import * as imports from "../../../prisma/null"

export const MovieSchema = z.object({
  id: z.number().int(),
  imdb_id: z.string(),
  title: z.string(),
  tagline: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
  runtime: z.number().int(),
  overview: z.string(),
  genres: z.string(),
  budget: z.number().int(),
  revenue: z.number().int(),
  homepage: z.string(),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
