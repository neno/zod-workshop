import {z} from "zod";

const authorDetailsSchema = z.object({
  name: z.string(),
  username: z.string(),
  avatar_path: z.string().nullable(),
  rating: z.number().nullable()
})

export const reviewSchema = z.object({
  author: z.string(),
  author_details: authorDetailsSchema.optional(),
  content: z.string(),
  created_at: z.string(),
  id: z.string(),
  updated_at: z.string(),
  url: z.string(),
})

export const tmdbReviewsResultSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    reviewSchema
  ),
});

export type TmdbReviewsResultType = z.infer<typeof tmdbReviewsResultSchema>
