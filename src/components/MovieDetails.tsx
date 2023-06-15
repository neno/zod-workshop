"use client"

import {FC, useState} from "react";
import {IconTrash} from "@/components/icons";
import {MovieForm} from "@/components/MovieForm";
import {DefList} from "@/components/DefList";
import {IMovie} from "@/models/movie";

interface MovieDetailsProps {
  movie: IMovie;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  return (
    <>
      <button onClick={toggleEditMode}>
        <IconTrash />
      </button>
      {editMode ? <MovieForm movie={movie} /> : <DefList movie={movie} />}
    </>
  )
}