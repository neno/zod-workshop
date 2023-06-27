'use client';

import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { FC } from 'react';
import Link from 'next/link';
import { TextField } from '@/components/TextField';
import { useRouter } from 'next/navigation';
import { updateMovie } from '@/app/actions';
import { Movie } from '@prisma/client';
import { ErrorsType } from '@/models';

const createFormSchema = (errors: ErrorsType) =>
  z.object({
    title: z
      .string(errors?.string)
      .nonempty({ message: errors.string.required_error }),
    imdb_id: z.string(errors?.string),
    poster_path: z.string(errors?.string),
    release_date: z.string(errors?.string),
    genres: z.string(errors?.string),
    overview: z.string(errors?.string),
  });

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
  const formSchema = createFormSchema(errors);
  type FormDataType = z.infer<typeof formSchema>;

  // const resolver = zodResolver(FormSchema(errors));
  // type FormDataType = typeof resolver;
  const router = useRouter();
  const { id, updatedAt, createdAt, ...rest } = movie;
  const methods = useForm<FormDataType>({
    defaultValues: {
      ...rest,
    },
  });
  const { handleSubmit } = methods;

  const submit = async (data: FormDataType) => {
    await updateMovie(movie.id, data);
    router.push(`/movies/${movie.id}`);
  };

  return (
    <FormProvider {...methods}>
      <form className='block w-full' noValidate onSubmit={handleSubmit(submit)}>
        <fieldset className='w-full'>
          <legend className='text-5xl font-bold'>Edit Movie Details</legend>
          <ol className='flex flex-col gap-3 w-full'>
            <li>
              <TextField label={translations.title} name='title' />
            </li>
            <li className='w-1/2'>
              <TextField label='Release Date' type='date' name='release_date' />
            </li>
            <li>
              <TextField label='Poster' name='poster_path' />
            </li>
            <li>
              <TextField label='Genre' name='genres' />
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
