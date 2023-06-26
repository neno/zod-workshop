import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { getMovieById } from '@/lib/api';
import { TmdbDetailMovieType, newMovieSchema } from '@/models';

export async function GET() {
  const movie = await prisma.movie.findMany();

  return new Response(JSON.stringify(movie), {
    headers: { 'content-type': 'application/json' },
  });
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  console.log(request.json());

  const fullMovieData: TmdbDetailMovieType | undefined = await getMovieById(id);
  console.log('genres', JSON.stringify(fullMovieData?.genres));
  
  if (fullMovieData) {
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

    const newMovie = await prisma.movie.create({
      data: validMovieData,
    });

    return new Response(JSON.stringify(newMovie), {
      headers: { 'content-type': 'application/json' },
    });
  }
}

export async function PATCH(request: NextRequest) {
  const { id, ...data } = await request.json();
  const updateMovie = await prisma.movie.update({
    where: { id },
    data,
  });

  return new Response(JSON.stringify(updateMovie), {
    headers: { 'content-type': 'application/json' },
  });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const deleteMovie = await prisma.movie.delete({
    where: { id },
  });

  return new Response(JSON.stringify(deleteMovie), {
    headers: { 'content-type': 'application/json' },
  });
}
