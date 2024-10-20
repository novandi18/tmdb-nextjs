import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { MovieDetailResponse, MovieResponse } from "@/interfaces/movie";
import { MovieFavoriteResponse } from "@/interfaces/movieFavorite";
import { ApiStatus } from "@/types/apiStatus";
import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH;

export const useGetFavoriteMovies = (
  accountId: string,
  sessionId: string,
  page: number = 1
): [MovieResponse | null, ApiStatus, Error | null] => {
  const [favorites, setFavorites] = useState<MovieResponse | null>(null);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setStatus(ApiStatus.Loading);
      try {
        const res = await axios.get(
          API_ENDPOINTS.FAVORITE_MOVIES(accountId),
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`
            },
            params: {
              session_id: sessionId,
              page: page
            }
          }
        );
        setFavorites(res.data);
        setStatus(ApiStatus.Success);
      } catch (err) {
        setError(err as Error);
        setStatus(ApiStatus.Error);
      }
    };

    fetchFavorites();
  }, [accountId, sessionId, page]);

  return [favorites, status, error];
}

export const setMovieFavorites = async (
  accountId: string,
  sessionId: string,
  movieId: number,
  favorite: boolean
): Promise<[MovieFavoriteResponse | null, ApiStatus, Error | null]> => {
  let response: MovieFavoriteResponse | null = null;
  let status: ApiStatus = ApiStatus.Idle;
  let error: Error | null = null;

  try {
    status = ApiStatus.Loading;
    const res = await axios.post(
      API_ENDPOINTS.ADD_FAVORITE(accountId),
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: favorite
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json;charset=utf-8'
        },
        params: {
          session_id: sessionId
        }
      }
    );
    response = res.data;
    status = ApiStatus.Success;
  } catch (err) {
    error = err as Error;
    status = ApiStatus.Error;
  }

  return [response, status, error];
};

export const useMovieDetails = (
  movieId: number
): [MovieDetailResponse | null, ApiStatus, Error | null] => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailResponse | null>(null);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setStatus(ApiStatus.Loading);
      try {
        const response = await axios.get(
          API_ENDPOINTS.GET_MOVIE_DETAIL(movieId),
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`
            }
          }
        );
        setMovieDetails(response.data);
        setStatus(ApiStatus.Success);
      } catch (err) {
        setError(err as Error);
        setStatus(ApiStatus.Error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return [movieDetails, status, error];
};

export const useIsMovieFavorite = (
  accountId: string,
  sessionId: string,
  movieId: number
): [boolean, ApiStatus, Error | null] => {
  const [favorites, favoriteStatus, favoriteError] = useGetFavoriteMovies(accountId, sessionId);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkIfFavorite = () => {
      if (favoriteStatus === ApiStatus.Success && favorites) {
        const movieIsFavorite = favorites.results.some((movie) => movie.id === movieId);
        setIsFavorite(movieIsFavorite);
        setStatus(ApiStatus.Success);
      } else if (favoriteError) {
        setError(favoriteError);
        setStatus(ApiStatus.Error);
      }
    };

    checkIfFavorite();
  }, [favorites, favoriteStatus, favoriteError, movieId]);

  return [isFavorite, status, error];
};
