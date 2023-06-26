import { Gallery } from '@/components/Gallery';
import { Movie } from '@/components/Movie';
import { searchMovies } from '@/lib/api';
import { MovieItemType } from '@/models';

interface SearchPageProps {
  searchParams: { search: string };
}

export default async function SearchPage({
  searchParams: { search },
}: SearchPageProps) {
  const movieItems = await searchMovies(search);

  if (movieItems?.length > 0) {
    return (
      <Gallery>
        {movieItems.map((movie: MovieItemType) => (
          <Movie key={movie.id} {...movie} isSelected={false} />
        ))}
      </Gallery>
    );
  }

  return (
    <p>
      Could not find any movies with title containing:
      <strong>${search}</strong>
    </p>
  );
}
