"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {IMovie} from "@/models/movie";
import {FC} from "react";
import Link from "next/link";
import {TextField} from "@/components/TextField";

const FormSchema = z.object({
  title: z.string().nonempty(),
  tagline: z.string(),
  release_date: z.string(),
  runtime: z.number().positive(),
  genres: z.string(),
  overview: z.string(),
  budget: z.number().positive(),
  revenue: z.number().positive(),
  homepage: z.string().url(),
  imdb_id: z.string(),
  popularity: z.number().positive(),
  vote_average: z.number().positive(),
  vote_count: z.number().positive()
});

type FormInput = z.infer<typeof FormSchema>;

interface MovieFormProps {
  movie: IMovie;
}

export const MovieForm: FC<MovieFormProps> = ({ movie }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...movie,
    },
  });

  return (
    <form className="w-full max-w-xl" onSubmit={handleSubmit((d) => console.log(d))}>
      <fieldset>
        <legend>Movie Details</legend>
        <ol className="grid grid-cols-6 gap-8">
          <li className="col-span-6">
            <TextField label="Title" control={control} name="title" required />
          </li>
          <li className="col-span-6">
            <TextField label="Tagline" control={control} name="tagline" />
          </li>
          <li className="col-span-3">
            <TextField label="Release Date" type="date" control={control} name="release_date" />
          </li>
          <li className="col-span-3">
            <TextField label="Runtime" type="number" name="runtime" control={control} />
          </li>
          <li className="col-span-6">
            <TextField multiline label="Overview" control={control} name="overview" />
          </li>
          <li className="col-span-3">
            <TextField label="Budget" type="number" name="budget" control={control} />
          </li>
          <li className="col-span-3">
            <TextField label="Revenue" type="number" name="revenue" control={control} />
          </li>
          <li className="col-span-6">
            <TextField label="Homepage" control={control} name="homepage" />
          </li>
          <li className="col-span-2">
            <TextField label="IMDB ID" control={control} name="imdb_id" />
          </li>
          <li className="col-span-2">
            <TextField label="Vote Average" type="number" control={control} name="vote_average" />
          </li>
          <li className="col-span-2">
            <TextField label="Votes Count" type="number" control={control} name="vote_count" />
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
  )
};