import { Movie, MovieResponse } from "@/interfaces/movie";
import { ApiStatus } from "@/types/apiStatus";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

const API_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH;

export const useNowPlayingMovies = (
  limit: number = 6
): [MovieResponse, ApiStatus, Error | null] => {
  const [movies, setMovies] = useState<MovieResponse>(
    { page: 0, results: [], total_pages: 0, total_results: 0 }
  );
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setStatus(ApiStatus.Loading);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.NOW_PLAYING}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`
            }
          }
        );
        response.data.results = response.data.results.slice(0, limit);
        setMovies(response.data);
        setStatus(ApiStatus.Success);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(new Error(error.response.data.status_message));
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setStatus(ApiStatus.Error);
      }
    };
    fetchMovies();
  }, []);

  return [movies, status, error];
}

export const usePopularMovies = (
  initialDisplay: number = 30, loadMoreDisplay: number = 6
): [MovieResponse, ApiStatus, Error | null, () => void] => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);

  const fetchMovies = useCallback(async () => {
    setStatus(ApiStatus.Loading);
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.POPULAR}`,
        {
          params: {
            page: currentPage
          },
          headers: {
            Authorization: `Bearer ${API_KEY}`
          }
        }
      );
      setMovies(prevMovies => [...prevMovies, ...response.data.results]);
      setStatus(ApiStatus.Success);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(new Error(error.response.data.status_message));
      } else {
        setError(new Error('An unknown error occurred'));
      }
      setStatus(ApiStatus.Error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length >= initialDisplay && displayedMovies.length === 0) {
      setDisplayedMovies(movies.slice(0, initialDisplay));
    }
  }, [movies, initialDisplay, displayedMovies.length]);

  const loadMoreMovies = () => {
    const currentDisplayedCount = displayedMovies.length;
    if (currentDisplayedCount + loadMoreDisplay <= movies.length) {
      setDisplayedMovies(movies.slice(0, currentDisplayedCount + loadMoreDisplay));
    } else {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }

  useEffect(() => {
    if (movies.length - displayedMovies.length < loadMoreDisplay) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [movies.length, displayedMovies.length, loadMoreDisplay]);

  return [
    {
      page: currentPage,
      results: displayedMovies,
      total_pages: 0,
      total_results: 0
    },
    status,
    error as Error | null,
    loadMoreMovies
  ];
}