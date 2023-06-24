import { IApiReviewsByMovieResult } from '@/models/api-review-results';
import { FullMovieData } from '@/models/full-movie-data';
import { IMovie } from '@/models/movie';
import { IApiSearchResult } from '@/models/search-results';


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
    return await fetchData('search/movie', `query=${searchTerm}`);
  }
  
  // console.log('searchMovies - api', searchTerm);
  // return await Promise.resolve({ page: 1, results: []})
}

export async function getMovieById(id: number): Promise<FullMovieData | undefined> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  return await fetchData(`movie/${id}`);
}

export async function getMovieReviews(id: number): Promise<IApiReviewsByMovieResult | undefined> {
  // `https://api.themoviedb.org/3/movie/popular?api_key=00f3f32198696caff437631c007a7548`
  return await fetchData(`movie/${id}/reviews`);
}