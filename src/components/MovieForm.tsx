'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FC } from 'react';
import Link from 'next/link';
import { TextField } from '@/components/TextField';
import { useRouter } from 'next/navigation';
import { updateMovie } from '@/app/actions';
import { Movie } from '@prisma/client';
import { ErrorsType, MovieUpdateType } from '@/models';
import { toast } from 'react-toastify';

interface MovieFormProps {
  movie: Movie;
  translations: any;
  errors: ErrorsType;
}

export const MovieForm: FC<MovieFormProps> = ({
  movie,
  translations,
  errors,
}) => {
  const router = useRouter();
  const { id, updatedAt, createdAt, ...rest } = movie;

  const schema: z.ZodSchema<MovieUpdateType> = z.object({
    title: z.string().nonempty({ message: errors.string.required_error }),
    imdb_id: z.string().nullish(),
    poster_path: z.string().nullish(),
    release_date: z.string().nullish(),
    genres: z.string().nullish(),
    overview: z.string().nullish(),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...rest },
  });

  const { handleSubmit } = methods;

  const submit = async (data: any) => {
    try {
      await updateMovie(movie.id, data);
      toast.success(`Updated “${data.title}“!`);
    } catch (error) {
      toast.error(error as string);
    } finally {
      router.push(`/movies/${movie.id}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className='block w-full' noValidate onSubmit={handleSubmit(submit)}>
        <fieldset className='w-full'>
          <legend className='text-5xl font-bold'>Edit Movie Details</legend>
          <ol className='flex flex-col gap-4 w-full'>
            <li>
              <TextField label={translations.title} name='title' />
            </li>
            <li>
              <ol className='grid grid-cols-2 gap-4'>
                <li>
                  <TextField label='IMDB' name='imdb_id' />
                </li>
                <li>
                  <TextField
                    label='Release Date'
                    type='date'
                    name='release_date'
                  />
                </li>
              </ol>
            </li>
            <li>
              <ol className='grid grid-cols-2 gap-4'>
                <li>
                  <TextField label='Poster' name='poster_path' />
                </li>
                <li>
                  <TextField label='Genre' name='genres' />
                </li>
              </ol>
            </li>
            <li>
              <TextField multiline label='Overview' name='overview' />
            </li>
          </ol>
          <div className='flex justify-start gap-4 mt-12'>
            <button className='btn btn-primary' type='submit'>
              Submit
            </button>
            <Link className='btn' href={`/movies/${movie.id}`}>
              Cancel
            </Link>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
};
