
import { GenreType, MovieItemType, TmdbReviewsResultType, TmdbSearchResultsType, tmdbReviewsResultSchema, tmdbSearchResultSchema } from '@/models';

const fetchData = async (path: string, params?: string) => {
  const url = `https://api.themoviedb.org/3/${path}?api_key=00f3f32198696caff437631c007a7548${params ? `&${params}` : ''}`;
  const res = await fetch(url);
  return await res.json();
}

export async function getPopularMovies(): Promise<TmdbSearchResultsType> {
  return await fetchData('movie/popular');
}

export async function searchMovies(searchTerm: string): Promise<MovieItemType[]> {
  if (searchTerm) {
    const searchResult = await fetchData('search/movie', `query=${searchTerm}`);
    const res = tmdbSearchResultSchema.parse(searchResult);
    const movieItems: MovieItemType[] = res.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
    }));

    return movieItems;
  }

  return [];
}

export async function getMovieDetailsById(id: number): Promise<{ genres: string | null; imdb_id: string | null; }> {
  const movie = await fetchData(`movie/${id}`);
  const genres = movie.genres ? movie.genres.map((genre: GenreType) => genre.name).join(', ') : null;
  const imdb_id = movie.imdb_id ? movie.imdb_id : null;
  return { genres, imdb_id };
}

export async function getMovieReviews(id: number): Promise<TmdbReviewsResultType | undefined> {
  const reviews = await fetchData(`movie/${id}/reviews`);
  return tmdbReviewsResultSchema.parse(reviews);
}