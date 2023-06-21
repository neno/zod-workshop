'use server'

import prisma from "@/lib/prisma";
import {getMovieById} from "@/lib/api";
import {IMovie} from "@/models/movie";
import {FormInput} from "@/components/MovieForm";

export async function addMovie(id: number) {

  const fullMovieData = await getMovieById(id);
  console.log('genres', JSON.stringify(fullMovieData?.genres));

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
  }
}

export async function updateMovie(id: number, data: FormInput) {
  await prisma.movie.update({
    where: { id },
    data,
  })
}

export async function deleteMovie(id: number) {
  await prisma.movie.delete({
    where: { id },
  });
}