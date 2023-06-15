import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {IMovie} from "@/models/movie";
import {FC} from "react";

const FormSchema = z.object({
  title: z.string().nonempty(),
  tagline: z.string().nonempty(),
});

type FormInput = z.infer<typeof FormSchema>;

interface MovieFormProps {
  movie: IMovie;
}

export const MovieForm: FC<MovieFormProps> = ({ movie }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...movie
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <fieldset>
        <legend>Movie Details</legend>
        <div className='grid grid-cols-3 w-full'>
          <label htmlFor="title">Title</label>
          <input id="title" {...register('title')} />
          {errors?.title?.message && <p>{errors.title.message}</p>}
        </div>
        <div className='grid grid-cols-3 w-full mt-2'>
          <label htmlFor="tagline">Tagline</label>
          <input id="tagline" {...register('tagline')} />
          {errors?.tagline?.message && <p>{errors.tagline.message}</p>}
        </div>
        <button className="btn" type="submit">Submit</button>
      </fieldset>
    </form>
  )
};