import {IApiReviewsByMovieResult, reviewResultSchema} from '@/models/api-review-results';
import {FullMovieData, fullMovieSchema} from '@/models/full-movie-data';
import {IApiSearchResult, apiSearchResultSchema} from '@/models/search-results';

const fetchData = async (path: string, params?: string) => {
  const url = `https://api.themoviedb.org/3/${path}?api_key=00f3f32198696caff437631c007a7548${params ? `&${params}` : ''}`;
  console.log('fetchData - api', url);
  
  const res = await fetch(url);
  return await res.json();
}

export async function getPopularMovies(): Promise<IApiSearchResult> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  return await fetchData('movie/popular');
}

export async function searchMovies(searchTerm: string): Promise<IApiSearchResult | undefined> {
  if (searchTerm) {
    const searchResult = await fetchData('search/movie', `query=${searchTerm}`);
    return apiSearchResultSchema.parse(searchResult);
  }

  return undefined;
  
  // console.log('searchMovies - api', searchTerm);
  // return await Promise.resolve({ page: 1, results: []})
}

export async function getMovieById(id: number): Promise<FullMovieData | undefined> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  const movie = await fetchData(`movie/${id}`);
  return fullMovieSchema.parse(movie);
}

export async function getMovieReviews(id: number): Promise<IApiReviewsByMovieResult | undefined> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  const reviews = await fetchData(`movie/${id}/reviews`);
  return reviewResultSchema.parse(reviews);
}