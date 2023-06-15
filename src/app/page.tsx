import { Gallery } from '@/components/Gallery';
import { Movie } from '@/components/Movie';
import prisma from '@/lib/prisma';
import { IMovieItem } from '@/models/movie-item';
import Link from 'next/link';

export default async function HomePage() {
  const movies = await prisma.movie.findMany({});

  if (movies && movies.length > 0) {
    return (
      <Gallery>
        {movies.map((movie: IMovieItem) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <Movie {...movie} isSelected={true} />
          </Link>
        ))}
      </Gallery>
    );
  }

  return <p>There are no selected movies.</p>;
}
