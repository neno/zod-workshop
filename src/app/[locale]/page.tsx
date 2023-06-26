import { Gallery } from '@/components/Gallery';
import { Movie } from '@/components/Movie';
import prisma from '@/lib/prisma';
import { MovieItemType } from '@/models';
import Link from 'next/link';

export default async function HomePage() {
  const movies = await prisma.movie.findMany({});

  if (movies && movies.length > 0) {
    return (
      <Gallery>
        {movies.map((movie: MovieItemType) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <Movie {...movie} isSelected={true} data-superjson />
          </Link>
        ))}
      </Gallery>
    );
  }

  return <p>There are no selected movies.</p>;
}
