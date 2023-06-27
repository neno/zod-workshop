'use client';

import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { FC } from 'react';
import Link from 'next/link';
import { TextField } from '@/components/TextField';
import { useRouter } from 'next/navigation';
import { updateMovie } from '@/app/actions';
import { ErrorsType, MovieType } from '@/models';

const createFormSchema = (errors: ErrorsType) =>
  z.object({
    title: z
      .string(errors?.string)
      .nonempty({ message: errors.string.required_error }),
    tagline: z.string(errors?.string).nullable().optional(),
    release_date: z.string(errors?.string),
    runtime: z.coerce
      .number(errors?.number)
      .nonnegative(errors.nonnegative)
      .nullable()
      .optional(),
    genres: z.string(errors?.string),
    overview: z.string(errors?.string),
    budget: z.coerce
      .number(errors?.number)
      .nonnegative(errors.nonnegative)
      .nullable()
      .optional(),
    revenue: z.coerce
      .number(errors?.number)
      .nonnegative(errors.nonnegative)
      .nullable()
      .optional(),
    homepage: z.union([
      z.literal(''),
      z.string(errors?.string).trim().url(errors?.url).nullable().optional(),
    ]),
  });

interface MovieFormProps {
  movie: MovieType;
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
  const methods = useForm<FormDataType>({
    defaultValues: {
      ...movie,
    },
  });
  const { handleSubmit } = methods;

  const submit = async (data: FormDataType) => {
    await updateMovie(movie.id, data);
    router.push(`/movies/${movie.id}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        className='w-full max-w-xl'
        noValidate
        onSubmit={handleSubmit((data) => submit(data))}
      >
        <fieldset>
          <legend className='text-3xl font-bold'>Movie Details</legend>
          <ol className='grid grid-cols-6 gap-4 mt-8'>
            <li className='col-span-6'>
              <TextField label={translations.title} name='title' />
            </li>
            <li className='col-span-6'>
              <TextField label='Tagline' name='tagline' />
            </li>
            <li className='col-span-3'>
              <TextField label='Release Date' type='date' name='release_date' />
            </li>
            <li className='col-span-3'>
              <TextField label='Runtime' type='number' name='runtime' />
            </li>
            <li className='col-span-6'>
              <TextField label='Genre' name='genres' />
            </li>
            <li className='col-span-6'>
              <TextField multiline label='Overview' name='overview' />
            </li>
            <li className='col-span-3'>
              <TextField label='Budget' type='number' name='budget' />
            </li>
            <li className='col-span-3'>
              <TextField label='Revenue' type='number' name='revenue' />
            </li>
            <li className='col-span-6'>
              <TextField label='Homepage' name='homepage' />
            </li>
          </ol>
          <div className='flex justify-between mt-12'>
            <button className='btn btn-primary' type='submit'>
              Submit
            </button>
            <Link className='btn btn-error' href={`/movies/${movie.id}`}>
              Cancel
            </Link>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  );
};
