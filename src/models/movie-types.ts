// import * as z from "zod";
// import { MovieSchema } from './generated/movie';
import { Movie, Prisma } from '@prisma/client';

// import { Prisma } from '@prisma/client';
import { z } from 'zod';

export type MovieCreateType = Prisma.MovieCreateArgs['data'];
// export const movieFormSchema = z.ZodType<MovieCreateType>;

export type MovieUpdateType = Prisma.MovieUpdateArgs['data'];



export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type GenreType = z.infer<typeof genreSchema>;

export const tmdbMovieItemSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  genre_ids: z.array(z.number()).nullish(),
  id: z.number(),
  title: z.string(),
  imdb_id: z.string().nullish(),
  release_date: z.string().nullish(),
  overview: z.string().nullish(),
  poster_path: z.string().nullish(),
  video: z.boolean(),
  original_language: z.string().nullish(),
  original_title: z.string().nullish(),
  popularity: z.number().nullish(),
  vote_average: z.number().nullish(),
  vote_count: z.number().nullish(),
});

export type TmdbMovieItemType = z.infer<typeof tmdbMovieItemSchema>;

export const tmdbSearchResultSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(
    tmdbMovieItemSchema
  ),
});

export type TmdbSearchResultsType = z.infer<typeof tmdbSearchResultSchema>

// Client
// export type MovieType = z.infer<typeof MovieSchema>;

// export const movieFormSchema = Prisma.MovieCreateArgs['data'].omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
// });

// export type MovieFormType = z.infer<typeof movieFormSchema>;

export type MovieItemType = Omit<Movie, 'genres' | 'imdb_id' | 'createdAt' | 'updatedAt'>;
