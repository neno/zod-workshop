'use client';

import { MouseEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IconPlus, IconTrash } from './icons';
import { IMovieItem } from '@/models/movie-item';
import {addMovie, deleteMovie} from "@/app/actions";

interface MovieProps extends IMovieItem {
  isSelected: boolean;
}

export function Movie({
  id,
  title,
  poster_path,
  isSelected: isSelected,
}: MovieProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const Icon = isSelected ? IconTrash : IconPlus;
  const isMutating = isPending || isFetching;

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setIsFetching(true);

    if (isSelected) {
      deleteMovie(id)
    } else {
      addMovie(id)
    }

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <Card title={title} poster_path={poster_path}>
      <Button disabled={isMutating} onClick={handleClick}>
        <Icon />
      </Button>
    </Card>
  );
}
