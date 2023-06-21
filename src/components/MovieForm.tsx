"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {IMovie} from "@/models/movie";
import {FC} from "react";
import Link from "next/link";
import {TextField} from "@/components/TextField";
import {useRouter} from "next/navigation";

const FormSchema = (errors) => z.object({
  title: z.string(errors?.string).nonempty({ message: errors.string.required_error}),
  tagline: z.string(errors?.string),
  release_date: z.string(errors?.string),
  runtime: z.coerce.number(errors?.number).nonnegative(errors.nonnegative).optional(),
  genres: z.string(errors?.string),
  overview: z.string(errors?.string),
  budget: z.coerce.number(errors?.number).nonnegative(errors.nonnegative).optional(),
  revenue: z.coerce.number(errors?.number).nonnegative(errors.nonnegative).optional(),
  homepage: z.string(errors?.string).url(errors?.url),
});

type FormInput = z.infer<typeof FormSchema>;

interface MovieFormProps {
  movie: IMovie;
  translations: any;
  errors: any;
}

export const MovieForm: FC<MovieFormProps> = ({ movie, translations, errors }) => {
  const router = useRouter();
  const methods = useForm<FormInput>({
    resolver: zodResolver(FormSchema(errors)),
    defaultValues: {
      ...movie,
    },
  });
  const { handleSubmit } = methods;

  const submit = async (data: FormInput) => {
    try {
      await fetch(`/api/movies`, {
        method: 'PATCH',
        body: JSON.stringify({...data, id: movie.id}),
      })

      router.push(`/movies/${movie.id}`);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider {...methods} >
      <form className="w-full max-w-xl" noValidate onSubmit={handleSubmit((data) => submit(data))}>
        <fieldset>
          <legend className="text-3xl font-bold">Movie Details</legend>
          <ol className="grid grid-cols-6 gap-8 mt-8">
            <li className="col-span-6">
              <TextField label={translations.title} name="title" />
            </li>
            <li className="col-span-6">
              <TextField label="Tagline" name="tagline" />
            </li>
            <li className="col-span-3">
              <TextField label="Release Date" type="date" name="release_date" />
            </li>
            <li className="col-span-3">
              <TextField label="Runtime" type="number" name="runtime" />
            </li>
            <li className="col-span-6">
              <TextField label="Genre" name="genres" />
            </li>
            <li className="col-span-6">
              <TextField multiline label="Overview" name="overview" />
            </li>
            <li className="col-span-3">
              <TextField label="Budget" type="number" name="budget" />
            </li>
            <li className="col-span-3">
              <TextField label="Revenue" type="number" name="revenue" />
            </li>
            <li className="col-span-6">
              <TextField label="Homepage" name="homepage" />
            </li>
          </ol>
          <div className="flex justify-between mt-12">
            <button className="btn btn-primary" type="submit">Submit</button>
            <Link className="btn btn-error" href={`/movies/${movie.id}`}>
              Cancel
            </Link>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  )
};