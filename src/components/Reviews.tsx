import { getMovieReviews } from '@/lib/api';
import { Stack } from './Stack';
import { TmdbReviewsResultType } from '@/models';

const fetchReviews = async (
  movieId: number
): Promise<TmdbReviewsResultType | undefined> => {
  const data = await getMovieReviews(movieId);
  return new Promise((resolve) => setTimeout(() => resolve(data), 2000));
};

export async function Reviews({ movieId }: { movieId: number }) {
  const data = await fetchReviews(movieId);

  if (data && data.results.length > 0) {
    return (
      <ul className='flex flex-col gap-4'>
        {data.results.map((review) => (
          <li key={review.id}>
            <Stack className='gap-2'>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </Stack>
          </li>
        ))}
      </ul>
    );
  }

  return <p>No reviews available</p>;
}
