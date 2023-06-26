
import { MovieItemType, TmdbDetailMovieType, TmdbReviewsResultType, TmdbSearchResultsType, tmdbDetailMovieSchema, tmdbReviewsResultSchema, tmdbSearchResultSchema } from '@/models';

const fetchData = async (path: string, params?: string) => {
  const url = `https://api.themoviedb.org/3/${path}?api_key=00f3f32198696caff437631c007a7548${params ? `&${params}` : ''}`;
  console.log('fetchData - api', url);
  
  const res = await fetch(url);
  return await res.json();
}

export async function getPopularMovies(): Promise<TmdbSearchResultsType> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  return await fetchData('movie/popular');
}

export async function searchMovies(searchTerm: string): Promise<MovieItemType[]> {
  if (searchTerm) {
    const searchResult = await fetchData('search/movie', `query=${searchTerm}`);
    const res = tmdbSearchResultSchema.parse(searchResult);
    const movieItems: MovieItemType[] = res.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path ?? '',
      release_date: movie.release_date,
    }));

    return movieItems;
  }

  return [];
}
// export async function searchMovies(searchTerm: string): Promise<MovieItemType[]> {
//   if (searchTerm) {
//     const searchResult = await fetchData('search/movie', `query=${searchTerm}`);
//     const res = tmdbSearchResultSchema.parse(searchResult);
//     const movieItems: MovieItemType[] = res.results.map((movie) => ({
//       id: movie.id,
//       title: movie.title,
//       poster_path: movie.poster_path,
//       release_date: movie.release_date,
//     }));

//     return movieItems;
//   }

//   return [];
  
//   // console.log('searchMovies - api', searchTerm);
//   // return await Promise.resolve({ page: 1, results: []})
// }

export async function getMovieById(id: number): Promise<TmdbDetailMovieType | undefined> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  const movie = await fetchData(`movie/${id}`);
  return tmdbDetailMovieSchema.parse(movie);
}

export async function getMovieReviews(id: number): Promise<TmdbReviewsResultType | undefined> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  const reviews = await fetchData(`movie/${id}/reviews`);
  return tmdbReviewsResultSchema.parse(reviews);
}