import { getMovieReviews } from '@/lib/api';
import { IApiReviewsByMovieResult } from '@/models/api-review-results';
import { VerticalContainer } from './VerticalContainer';

const fetchReviews = async (
  movieId: number
): Promise<IApiReviewsByMovieResult | undefined> => {
  const data = await getMovieReviews(movieId);
  return new Promise((resolve) => setTimeout(() => resolve(data), 2000));
};

export async function Reviews({ movieId }: { movieId: number }) {
  const data = await fetchReviews(movieId);

  if (data && data.results) {
    return (
      <ul className='flex flex-col gap-4'>
        {data.results.map((review) => (
          <li key={review.id}>
            <VerticalContainer className='gap-2'>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </VerticalContainer>
          </li>
        ))}
      </ul>
    );
  }

  return <p>No reviews available</p>;
}
