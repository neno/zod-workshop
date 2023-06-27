import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { MovieType } from '@/models';

interface DefListProps {
  movie: MovieType;
}

export const DefList: FC<DefListProps> = ({ movie }) => {
  const t = useTranslations('movie');

  return (
    <dl className='flex flex-col w-full'>
      <dt className='text-md font-bold mb-1 uppercase'>{t('released')}</dt>
      <dd className='mb-4'>{movie.release_date}</dd>
      <dt className='text-md font-bold mb-1 uppercase'>{t('imdbId')}</dt>
      <dd className='mb-4'>{movie.imdb_id}</dd>
      <dt className='text-md font-bold mb-1 uppercase'>{t('genre')}</dt>
      <dd className='mb-4'>{movie.genres}</dd>
      <dt className='text-md font-bold mb-1 uppercase'>{t('overview')}</dt>
      <dd className='mb-4'>{movie.overview}</dd>
    </dl>
  );
};
