'use client';

import { MouseEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IconPlus, IconTrash } from './icons';
import { IMovieItem } from '@/models/movie-item';

interface MovieProps extends IMovieItem {
  isSelected: boolean;
}

export function Movie({
  id,
  title,
  poster_path,
  isSelected: isSlected,
}: MovieProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const Icon = isSlected ? IconTrash : IconPlus;
  const isMutating = isPending || isFetching;
  const method = isSlected ? 'DELETE' : 'POST';

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setIsFetching(true);
    await fetch(`/api/movies`, {
      method,
      body: JSON.stringify({ id }),
    });

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
