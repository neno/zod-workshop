'use server'

import { getMovieGenresByMovieId } from '@/lib/api';
import prisma from "@/lib/prisma";
import { MovieSchema } from '@/models';
import { MovieCreateType, MovieUpdateType, TmdbMovieItemType } from '@/models/movie-types';
import { Prisma } from '@prisma/client';
import { mergeTypes, z } from 'zod';

// export type MovieFormType = Prisma.MovieCreateArgs['data']
// type myType = z.infer<typeof MovieSchema>
// type myType = MovieCreateArgs.data
// export async function addMovie(movie: any) {
//   console.log('movie', movie);
//   // return undefined;
  
//   // const genres = await getMovieGenresByMovieId(movie.id);
//   // // const validatedData = movieFormSchema.parse({...movie, genres});

//   return await prisma.movie.create({
//     data: {...movie, imdb_id: null, genres: [], title: null},
//   });
// }

type AddMovieDataType = mergeTypes<MovieCreateType, { id: number} >

export async function addMovie(data: AddMovieDataType) {
  const genres = await getMovieGenresByMovieId(data.id);
  const { id, ...rest } = data;

  return await prisma.movie.create({
    data: {...rest, genres: genres ?? '' },
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
