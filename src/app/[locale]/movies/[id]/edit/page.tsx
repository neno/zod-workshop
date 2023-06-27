import { NextImage } from '@/components/NextImage';
import { Stack } from '@/components/Stack';
import prisma from '@/lib/prisma';
import { MovieForm } from '@/components/MovieForm';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Movie } from '@prisma/client';

interface MovieFormTemplateProps {
  movie: Movie;
}

const MovieFormTemplate: FC<MovieFormTemplateProps> = ({ movie }) => {
  const t = useTranslations('');
  const translations = {
    legend: t('movie.form.title'),
    title: t('movie.title'),
    overview: t('movie.overview'),
    released: t('movie.released'),
    imdbId: t('movie.imdbId'),
    genre: t('movie.genre'),
    submit: t('movie.form.submit'),
    cancel: t('movie.form.cancel'),
  };

  const errors = {
    string: {
      required_error: t('errors.required'),
      invalid_type_error: t('errors.string'),
    },
    number: {
      required_error: t('errors.required'),
      invalid_type_error: t('errors.number'),
    },
    nonnegative: {
      message: t('errors.nonnegative'),
    },
    url: {
      message: t('errors.url'),
    },
  };

  return (
    <MovieForm movie={movie} translations={translations} errors={errors} />
  );
};

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
            <MovieFormTemplate movie={movie} />
          </div>
        </div>
      </Stack>
    );
  }

  return null;
}
