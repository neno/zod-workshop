
import { GenreType, MovieItemType, TmdbReviewsResultType, TmdbSearchResultsType, tmdbReviewsResultSchema, tmdbSearchResultSchema } from '@/models';

const fetchData = async (path: string, params?: string) => {
  const url = `https://api.themoviedb.org/3/${path}?api_key=00f3f32198696caff437631c007a7548${params ? `&${params}` : ''}`;
  console.log('fetchData - api', url);
  
  const res = await fetch(url);
  return await res.json();
}

export async function getPopularMovies(): Promise<TmdbSearchResultsType> {
  return await fetchData('movie/popular');
}

export async function searchMovies(searchTerm: string): Promise<MovieItemType[]> {
  console.log('searchMovies - api', searchTerm);
  
  if (searchTerm) {
    const searchResult = await fetchData('search/movie', `query=${searchTerm}`);
    // const res = tmdbSearchResultSchema.parse(searchResult);

    // console.log('searchMovies - res', res);
    
    
    const movieItems: MovieItemType[] = searchResult.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      imdb_id: !!movie.imdb_id ? movie.imdb_id : null,
      poster_path: !!movie.poster_path ? movie.poster_path : null,
      overview: !!movie.overview ? movie.overview : null,
      release_date: !!movie.release_date ? movie.release_date : null,
    }));

    return movieItems;
  }

  return [];
}

export async function getMovieGenresByMovieId(id: number): Promise<string | undefined> {
  const movie = await fetchData(`movie/${id}`);
  const genres = movie.genres?.map((genre: GenreType) => genre.name).join(', ');
  return genres;
}

export async function getMovieReviews(id: number): Promise<TmdbReviewsResultType | undefined> {
  const reviews = await fetchData(`movie/${id}/reviews`);
  return tmdbReviewsResultSchema.parse(reviews);
}