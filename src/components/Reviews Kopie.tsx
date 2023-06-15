import { getMovieReviews } from '@/lib/api';
import { IApiReviewsByMovieResult } from '@/models/api-review-results';

const fetchReviews = async (
  movieId: number
): Promise<IApiReviewsByMovieResult | undefined> => {
  const data = await getMovieReviews(movieId);
  return new Promise((resolve) => setTimeout(() => resolve(data), 2000));
};

export async function Reviews({ movieId }: { movieId: number }) {
  const data = await fetchReviews(movieId);

  console.log(data);

  if (data && data.results) {
    return (
      <ul>
        {data.results.map((review) => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }

  return <p>No reviews available</p>;
}
