'use client';

import { MouseEvent, useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IconPlus, IconTrash } from './icons';
import { addMovie, deleteMovie } from '@/app/actions';
import { MovieItemType } from '@/models';

interface MovieProps extends MovieItemType {
  isSelected: boolean;
}

export function Movie({
  id,
  title,
  poster_path,
  isSelected: isSelected,
}: MovieProps) {
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
      } else {
        await addMovie(id);
      }

      setIsFetching(false);
    } catch (error) {
      setErrorMessage(error as string);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      throw new Error(errorMessage);
    }
  });

  return (
    <Card title={title} poster_path={poster_path ?? '/no-image.png'}>
      <Button disabled={isMutating} onClick={handleClick}>
        <Icon />
      </Button>
    </Card>
  );
}
