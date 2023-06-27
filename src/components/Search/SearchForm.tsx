'use client';

import { useSearchParams } from 'next/navigation';

interface SearchFormProps {
  onSubmit: (searchTerm: string) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSubmit }: SearchFormProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = event.currentTarget.searchTerm.value;
    const encodedQ = encodeURIComponent(q);
    onSubmit(encodedQ);
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <label className='block border border-gray-500 p-1 rounded bg-black'>
          <input
            type='text'
            placeholder='Search Movies...'
            name='searchTerm'
            className='flex w-full bg-black px-2 py-1'
            defaultValue={searchTerm ?? ''}
          />
        </label>
      </form>
    </div>
  );
}
