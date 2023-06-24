import {fullMovieSchema} from "@/models/full-movie-data";
import * as z from "zod";

export const apiSearchResultSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    fullMovieSchema
  ),
});

export type IApiSearchResult = z.infer<typeof apiSearchResultSchema>
