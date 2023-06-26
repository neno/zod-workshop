import {reviewSchema} from './review';
import * as z from "zod";


export const reviewResultSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    reviewSchema
  ),
});

export type IApiReviewsByMovieResult = z.infer<typeof reviewResultSchema>
