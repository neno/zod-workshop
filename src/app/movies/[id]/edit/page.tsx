import { NextImage } from '@/components/NextImage';
import { VerticalContainer } from '@/components/VerticalContainer';
import prisma from '@/lib/prisma';
import {MovieForm} from "@/components/MovieForm";

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
        <div className='grid grid-cols-2 gap-8'>
          <div className='relative'>
            <NextImage
              src={movie.poster_path}
              alt={movie.title}
              className='object-cover object-center'
              fill
              sizes='(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw'
            />
          </div>
          <div>
            <MovieForm movie={movie} />
          </div>
        </div>
      </VerticalContainer>
    );
  }

  return null;
}
