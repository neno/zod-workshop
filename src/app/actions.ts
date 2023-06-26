'use server'

import prisma from "@/lib/prisma";
import {getMovieById} from "@/lib/api";
import { z } from "zod";
import { MovieType, NewMovieType, TmdbDetailMovieType, newMovieSchema, tmdbDetailMovieSchema } from '@/models/movie-types';

export async function addMovie(id: number): Promise<MovieType> {
  const fullMovieData: TmdbDetailMovieType | undefined = await getMovieById(id);

  
  const validatedMovieData: NewMovieType = newMovieSchema.parse(fullMovieData);

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