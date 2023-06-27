'use client';

import { useState } from 'react';
import { Stack } from '../Stack';
import { SearchForm } from './SearchForm';
import useSWR from 'swr';
import { searchMovies } from '@/lib/api';
import { Gallery } from '../Gallery';
import { Movie } from '../Movie';
import { MovieItemType } from '@/models';

export function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    isLoading,
    data: movieItems,
    error,
  } = useSWR(!!searchTerm && searchTerm, searchMovies);

  const onSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <Stack className='gap-8'>
      <SearchForm onSubmit={onSubmit} />
      <Gallery>
        {movieItems &&
          movieItems.length > 0 &&
          movieItems.map((movie: MovieItemType) => (
            <Movie key={movie.id} movie={movie} isSelected={false} />
          ))}
      </Gallery>
    </Stack>
  );
}
