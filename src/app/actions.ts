'use server'

import prisma from "@/lib/prisma";
import {getMovieById} from "@/lib/api";
import { MovieType, TmdbDetailMovieType, newMovieSchema, updateMovieSchema } from '@/models/movie-types';

export async function addMovie(id: number): Promise<MovieType | undefined> {
  let fullMovieData: TmdbDetailMovieType | undefined = await getMovieById(id);

  if (!fullMovieData) {
    return;
  }

  const validMovieData = newMovieSchema.parse({
    imdb_id: fullMovieData.imdb_id ?? '',
    title: fullMovieData.title,
    tagline: fullMovieData.tagline,
    poster_path: fullMovieData.poster_path ?? '',
    release_date: fullMovieData.release_date,
    runtime: fullMovieData.runtime,
    overview: fullMovieData.overview,
    genres: fullMovieData.genres?.map((genre) => genre.name).join(', '),
    budget: fullMovieData.budget,
    revenue: fullMovieData.revenue,
    homepage: fullMovieData.homepage,
    popularity: fullMovieData.popularity,
    vote_average: fullMovieData.vote_average,
    vote_count: fullMovieData.vote_count,
  });

  return await prisma.movie.create({
    data: validMovieData,
  });
}

export async function updateMovie(id: number, data: Partial<MovieType>) {
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
