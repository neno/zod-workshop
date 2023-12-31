import { NextImage } from '@/components/NextImage';
import { Stack } from '@/components/Stack';
import prisma from '@/lib/prisma';
import { DefList } from '@/components/DefList';
import Link from 'next/link';

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
      <Stack>
        <div className='grid grid-cols-12 gap-8'>
          <div className='relative col-span-4 bg-gray-300'>
            {!!movie.poster_path && (
              <NextImage
                src={movie.poster_path ?? '/no-image.png'}
                alt={movie.title}
                className='w-full h-full object-cover object-center'
                sizes='(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw'
                width={640}
                height={960}
              />
            )}
          </div>
          <div className='col-span-8'>
            <h1 className='position-center leading-snug'>{movie.title}</h1>
            <DefList movie={movie} />
            <Link
              className='btn btn-primary mt-8'
              href={`/movies/${movie.id}/edit`}
            >
              Edit
            </Link>
          </div>
        </div>
      </Stack>
    );
  }

  return null;
}
