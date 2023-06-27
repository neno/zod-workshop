'use client';

import { MouseEvent, useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IconPlus, IconTrash } from './icons';
import { addMovie, deleteMovie } from '@/app/actions';
import { MovieItemType } from '@/models';
import { toast } from 'react-toastify';

interface MovieProps {
  movie: MovieItemType;
  isSelected: boolean;
}

export function Movie({ movie, isSelected }: MovieProps) {
  const { id, title, poster_path } = movie;
  const [isPending] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const Icon = isSelected ? IconTrash : IconPlus;
  const isMutating = isPending || isFetching;
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsFetching(true);
      if (isSelected) {
        await deleteMovie(id);
        toast.success(`Removed “${title}“ from playlist!`);
      } else {
        await addMovie(movie);
        toast.success(`Added “${title}“ to playlist!`);
      }
    } catch (error) {
      toast.error(error as string);
      setErrorMessage(error as string);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  });

  return (
    <Card title={title} poster_path={poster_path}>
      <Button disabled={isMutating} onClick={handleClick}>
        <Icon />
      </Button>
    </Card>
  );
}
