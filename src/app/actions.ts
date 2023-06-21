'use server'

import prisma from "@/lib/prisma";
import {getMovieById} from "@/lib/api";
import { z } from "zod";

const movieDataSchema = z.object({
  id: z.number(),
  imdb_id: z.string(),
  title: z.string(),
  tagline: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
  runtime: z.number(),
  overview: z.string(),
  genres: z.array(z.object({ name: z.string() }))
    .transform((value) => value.map((genre) => genre.name).join(', ')),
  budget: z.number(),
  revenue: z.number(),
  homepage: z.string(),
  popularity: z.number(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export async function addMovie(id: number) {

  const fullMovieData = await getMovieById(id);

  const validatedMovieData = movieDataSchema.parse(fullMovieData);

  const movie = {
    id: validatedMovieData.id,
    imdb_id: validatedMovieData.imdb_id,
    title: validatedMovieData.title,
    tagline: validatedMovieData.tagline,
    poster_path: validatedMovieData.poster_path,
    release_date: validatedMovieData.release_date,
    runtime: validatedMovieData.runtime,
    overview: validatedMovieData.overview,
    genres: validatedMovieData.genres,
    budget: validatedMovieData.budget,
    revenue: validatedMovieData.revenue,
    homepage: validatedMovieData.homepage,
    popularity: validatedMovieData.popularity,
    vote_average: validatedMovieData.vote_average,
    vote_count: validatedMovieData.vote_count,
  };

  return await prisma.movie.create({
    data: movie,
  });
}

const updateMovieSchema = z.object({
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

export async function updateMovie(id: number, data: any) {
  const validatedData = updateMovieSchema.parse(data);

  return await prisma.movie.update({
    where: { id },
    data: validatedData,
  });
}

export async function deleteMovie(id: number) {
  return await prisma.movie.delete({
    where: { id },
  });
}