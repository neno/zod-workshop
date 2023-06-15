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
            <MovieForm movie={movie} />
          </div>
        </div>
      </VerticalContainer>
    );
  }

  return null;
}
