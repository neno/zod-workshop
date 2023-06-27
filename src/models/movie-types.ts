import * as z from "zod";
import { movieSchema } from './generated';

const collectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string(),
})

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string(),
  name: z.string(),
  origin_country: z.string()
})

const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string()
})

const spokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string()
})

export const tmdbDetailMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  belongs_to_collection: z.array(
    collectionSchema
  ).nullish(),
  budget: z.number().nullish(),
  genres: z.array(genreSchema).nullish(),
  homepage: z.string().nullish(),
  id: z.number(),
  imdb_id: z.string().nullish(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullish(),
  production_companies: z.array(
    productionCompanySchema
  ).nullish(),
  production_countries: z.array(
    productionCountrySchema
  ).nullish(),
  release_date: z.string(),
  revenue: z.number().nullish(),
  runtime: z.number().nullish(),
  spoken_languages: z.array(
    spokenLanguageSchema
  ).nullish(),
  status: z.string().nullish(),
  tagline: z.string().nullish(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number()
});

export type TmdbDetailMovieType = z.infer<typeof tmdbDetailMovieSchema>;

export const newMovieSchema = tmdbDetailMovieSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  adult: true,
  backdrop_path: true,
  original_language: true,
  original_title: true,
  video: true
}).extend({
  genres: z.string(),
});

export type NewMovieType = z.infer<typeof newMovieSchema>

export const updateMovieSchema = z.object({
  title: z.string().optional(),
  tagline: z.string().optional(),
  release_date: z.string().optional(),
  runtime: z.number().nonnegative().optional(),
  genres: z.string().optional(),
  overview: z.string().optional(),
  budget: z.number().nonnegative().optional(),
  revenue: z.number().nonnegative().optional(),
  homepage: z.union([z.literal(""), z.string().trim().url()]),
});

export type UpdateMovieType = z.infer<typeof updateMovieSchema>

export type MovieType = z.infer<typeof movieSchema>

export type MovieItemType = Pick<MovieType, 'id' | 'title' | 'poster_path' | 'release_date'>
