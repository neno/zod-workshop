import { IMovie } from '@/models/movie';
import { FC } from 'react';
import {useTranslations} from "next-intl";

interface DefListProps {
  movie: IMovie;
}

export const DefList: FC<DefListProps> = ({ movie }) => {
  const t = useTranslations('movie');

  return (
    <dl className='grid grid-cols-3 w-full'>
      <dt>{t('title')}</dt>
      <dd className='col-span-2'>{movie.title}</dd>
      <dt>{t('tagline')}</dt>
      <dd className='col-span-2'>{movie.tagline}</dd>
      <dt>{t('released')}</dt>
      <dd className='col-span-2'>{movie.release_date}</dd>
      <dt>{t('runtime')}</dt>
      <dd className='col-span-2'>{movie.runtime}</dd>
      <dt>{t('genre')}</dt>
      <dd className='col-span-2'>{movie.genres}</dd>
      <dt>{t('overview')}</dt>
      <dd className='col-span-2'>{movie.overview}</dd>
      <dt>{t('budget')}</dt>
      <dd className='col-span-2'>{movie.budget}</dd>
      <dt>{t('revenue')}</dt>
      <dd className='col-span-2'>{movie.revenue}</dd>
      <dt>{t('homepage')}</dt>
      <dd className='col-span-2'>
        {movie.homepage && (
          <a
            href={movie.homepage}
            title={movie.homepage}
            target='_blank'
            className='inline-block max-w-full truncate'
          >
            {movie.homepage}
          </a>
        )}
      </dd>
      <dt>{t('imdbId')}</dt>
      <dd className='col-span-2'>{movie.imdb_id}</dd>
      <dt>{t('popularity')}</dt>
      <dd className='col-span-2'>{movie.popularity}</dd>
      <dt>{t('voteAverage')}</dt>
      <dd className='col-span-2'>{movie.vote_average}</dd>
      <dt>{t('voteCount')}</dt>
      <dd className='col-span-2'>{movie.vote_count}</dd>
    </dl>
  );
}
