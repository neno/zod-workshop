"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {IMovie} from "@/models/movie";
import {FC} from "react";
import Link from "next/link";
import {TextField} from "@/components/TextField";

const FormSchema = (errors) => z.object({
  title: z.string(errors?.string),
  tagline: z.string(errors?.string),
  release_date: z.string(errors?.string),
  runtime: z.coerce.number(errors.number).nonnegative().optional(),
  genres: z.string(errors?.string),
  overview: z.string(errors?.string),
  budget: z.coerce.number().nonnegative().optional(),
  revenue: z.coerce.number().nonnegative().optional(),
  homepage: z.string(errors?.string).url(),
});

type FormInput = z.infer<typeof FormSchema>;

interface MovieFormProps {
  movie: IMovie;
}

export const MovieForm: FC<MovieFormProps> = ({ movie, translations, errors }) => {
  const methods = useForm<FormInput>({
    resolver: zodResolver(FormSchema(errors)),
    defaultValues: {
      ...movie,
    },
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods} >
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <form className="w-full max-w-xl" noValidate onSubmit={handleSubmit((data) => console.log(data))}>
        <fieldset>
          <legend className="text-3xl font-bold">{translations.legend}</legend>
          <ol className="grid grid-cols-6 gap-8 mt-8">
            <li className="col-span-6">
              <TextField label={translations.title} name="title" required />
            </li>
            <li className="col-span-6">
              <TextField label={translations.tagline} name="tagline" />
            </li>
            <li className="col-span-3">
              <TextField label={translations.released} type="date" name="release_date" />
            </li>
            <li className="col-span-3">
              <TextField label={translations.runtime} type="number" name="runtime" />
            </li>
            <li className="col-span-6">
              <TextField label={translations.genre} name="genres" />
            </li>
            <li className="col-span-6">
              <TextField multiline label={translations.overview} name="overview" />
            </li>
            <li className="col-span-3">
              <TextField label={translations.budget} type="number" name="budget" />
            </li>
            <li className="col-span-3">
              <TextField label={translations.revenue} type="number" name="revenue" />
            </li>
            <li className="col-span-6">
              <TextField label={translations.homepage} name="homepage" />
            </li>
          </ol>
          <div className="flex justify-between mt-12">
            <button className="btn btn-primary" type="submit">{translations.submit}</button>
            <Link className="btn btn-error" href={`/movies/${movie.id}`}>
              {translations.cancel}
            </Link>
          </div>
        </fieldset>
      </form>
    </FormProvider>
  )
};