'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = event.currentTarget.searchTerm.value;
    const encodedQ = encodeURIComponent(q);
    router.push(`/search?search=${encodedQ}`);
  }

  return (
    <div className='max-w-2xl mx-auto py-4'>
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
