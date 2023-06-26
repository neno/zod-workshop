import * as z from "zod";
import { MovieSchema } from './generated';

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
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.array(
    collectionSchema
  ).optional(),
  budget: z.number().optional(),
  genres: z.array(genreSchema)
    .transform((value) => value.map((genre) => genre.name).join(', ')),
  homepage: z.string().optional(),
  id: z.number(),
  imdb_id: z.string().optional(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    productionCompanySchema
  ).optional(),
  production_countries: z.array(
    productionCountrySchema
  ).optional(),
  release_date: z.string(),
  revenue: z.number().optional(),
  runtime: z.number().optional(),
  spoken_languages: z.array(
    spokenLanguageSchema
  ).optional(),
  status: z.string().optional(),
  tagline: z.string().optional(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number()
});

export type TmdbDetailMovieType = z.infer<typeof tmdbDetailMovieSchema>;

export const newMovieSchema = MovieSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type MovieType = z.infer<typeof MovieSchema>


export type MovieItemType = Pick<MovieType, 'id' | 'title' | 'poster_path' | 'release_date'>
