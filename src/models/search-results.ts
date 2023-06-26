import * as z from "zod";
import {tmdbDetailMovieSchema} from "@/models/movie-types";

export const tmdbSearchResultSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    tmdbDetailMovieSchema
  ),
});

export type TmdbSearchResultsType = z.infer<typeof tmdbSearchResultSchema>
