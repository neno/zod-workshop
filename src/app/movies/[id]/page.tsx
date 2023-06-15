import { NextImage } from '@/components/NextImage';
import { Reviews } from '@/components/Reviews';
import { VerticalContainer } from '@/components/VerticalContainer';
import prisma from '@/lib/prisma';
import {Suspense} from 'react';
import {MovieDetails} from "@/components/MovieDetails";

export default async function MoviePage({
  params: { id },
}: {
  params: { id: number };
}) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: +id,
    },
  });

  if (movie) {
    return (
      <VerticalContainer>
        <div className='grid grid-cols-4 gap-8'>
          <div>
            <NextImage
              src={movie.poster_path}
              alt={movie.title}
              className='w-full h-full object-cover object-center'
              sizes='(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw'
              width={640}
              height={960}
            />
          </div>
          <div className='col-span-3'>
            <MovieDetails movie={movie} />
          </div>
        </div>
        <section>
          <VerticalContainer className='gap-4'>
            <h2>Reviews</h2>
            <Suspense fallback={<p>Loading...</p>}>
              {/* @ts-expect-error Async Server Component */}
              <Reviews movieId={movie.id} />
            </Suspense>
          </VerticalContainer>
        </section>
      </VerticalContainer>
    );
  }

  return null;
}
