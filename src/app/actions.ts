'use server'

import prisma from "@/lib/prisma";
import {getMovieById} from "@/lib/api";
import {FormInput} from "@/components/MovieForm";

export async function addMovie(id: number) {

  const fullMovieData = await getMovieById(id);

  if (fullMovieData) {
    const movie = {
      id: fullMovieData.id,
      imdb_id: fullMovieData.imdb_id,
      title: fullMovieData.title,
      tagline: fullMovieData.tagline,
      poster_path: fullMovieData.poster_path,
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
    }

    await prisma.movie.create({
      data: movie,
    });
  } else {
    return {
      error: 'Movie was not found in ',
    }
  }
}

export async function updateMovie(id: number, data: FormInput) {

  try {
    const movie = await prisma.movie.update({
      where: { id },
      data,
    })

    return {
      movie
    }
  } catch (error) {
    return {
      error: 'There was error deleting the movie'
    }
  }
}

export async function deleteMovie(id: number) {
  try {
    const movie = await prisma.movie.delete({
      where: { id },
    });

    return {
      movie
    }
  } catch (error) {
    return {
      error: 'There was error deleting the movie'
    }
  }
}