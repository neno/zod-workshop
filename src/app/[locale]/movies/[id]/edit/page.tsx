import { NextImage } from '@/components/NextImage';
import { VerticalContainer } from '@/components/VerticalContainer';
import prisma from '@/lib/prisma';
import {MovieForm} from "@/components/MovieForm";
import {useTranslations} from "next-intl";
import {FC} from "react";
import {IMovie} from "@/models/movie";

interface MovieFormTemplateProps {
  movie: IMovie;
}

const MovieFormTemplate: FC<MovieFormTemplateProps> = ({ movie }) => {
  const t = useTranslations('');
  const translations = {
    legend: t('movie.form.title'),
    title: t('movie.title'),
    overview: t('movie.overview'),
    tagline: t('movie.tagline'),
    released: t('movie.released'),
    runtime: t('movie.runtime'),
    genre: t('movie.genre'),
    budget: t('movie.budget'),
    revenue: t('movie.revenue'),
    homepage: t('movie.homepage'),
    submit: t('movie.form.submit'),
    cancel: t('movie.form.cancel'),
  }

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
    }
  };

  return (
    <MovieForm movie={movie} translations={translations} errors={errors} />
  )
}

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
            <MovieFormTemplate movie={movie} />
          </div>
        </div>
      </VerticalContainer>
    );
  }

  return null;
}
