'use server'

import { getMovieDetailsById } from '@/lib/api';
import prisma from "@/lib/prisma";
import { MovieItemType, MovieUpdateType } from '@/models/movie-types';

export async function addMovie(data: MovieItemType) {
  const { genres, imdb_id } = await getMovieDetailsById(data.id);
  const { id, ...rest } = data;

  return await prisma.movie.create({
    data: {...rest, genres, imdb_id },
  });
}

export async function updateMovie(id: number, data: MovieUpdateType) {
  return await prisma.movie.update({
    where: { id },
    data,
  });
}

export async function deleteMovie(id: number) {
  return await prisma.movie.delete({
    where: { id },
  });
}
