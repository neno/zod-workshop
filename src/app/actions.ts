'use server'

import prisma from "@/lib/prisma";
import {getMovieById} from "@/lib/api";
import { z } from "zod";
import { IMovie } from '@/models/generated/movie';
import { tmdbDetailMovieSchema } from '@/models/movie-types';

// const movieDataSchema = z.object({
//   id: z.number(),
//   imdb_id: z.string(),
//   title: z.string(),
//   tagline: z.string(),
//   poster_path: z.string(),
//   release_date: z.string(),
//   runtime: z.number(),
//   overview: z.string(),
//   genres: z.array(z.object({ name: z.string() }))
//     .transform((value) => value.map((genre) => genre.name).join(', ')),
//   budget: z.number(),
//   revenue: z.number(),
//   homepage: z.string(),
//   popularity: z.number(),
//   vote_average: z.number(),
//   vote_count: z.number(),
// });

export async function addMovie(id: number): Promise<IMovie> {
  const fullMovieData = await getMovieById(id);
  const validatedMovieData: Omit<IMovie, 'updatedAt' | 'createdAt' | 'id'> = tmdbDetailMovieSchema.parse(fullMovieData);

  return await prisma.movie.create({
    data: validatedMovieData,
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