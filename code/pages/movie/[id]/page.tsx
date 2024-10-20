import { setMovieFavorites, useIsMovieFavorite, useMovieDetails } from "@/api/movieFavoriteApi";
import CardSkeleton from "@/components/common/CardSkeleton";
import FavoriteButton from "@/components/common/FavoriteButton";
import { ApiStatus } from "@/types/apiStatus";
import { decrypt, formatDate } from "@/utils/utils";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Alert from "@/components/common/Alert";

export default function MovieDetailPage({ id, setTitle }: { id: number, setTitle: (title: string) => void }) {
  const [movieDetails, status, error] = useMovieDetails(id);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const accountId = Cookies.get('tmdb_account_id') as string;
  const sessionId = Cookies.get('tmdb_session_id') as string;
  const decryptedSessionId = sessionId ? decrypt(sessionId) : '';

  const [isMovieFavorite, favoriteStatus] = useIsMovieFavorite(
    accountId, 
    decryptedSessionId, 
    id
  );

  useEffect(() => {
    if (favoriteStatus === ApiStatus.Success) {
      setIsFavorite(isMovieFavorite);
    } else if (favoriteStatus === ApiStatus.Error) {
      setIsFavorite(false);
    }
  }, [favoriteStatus, isMovieFavorite]);

  const handleToggleFavorite = async () => {
    const [, status] = await setMovieFavorites(
      accountId, 
      decryptedSessionId, 
      id, 
      !isFavorite
    );

    if (status === ApiStatus.Success) {
      setIsFavorite(!isFavorite);
    }
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center mt-16">
        <span className="text-sky-950 dark:text-white">{error.message}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-600" onClick={() => {
          if (accountId && sessionId) {
            window.location.reload();
          }
        }}>Reload</button>
      </div>
    )
  }

  if (status === ApiStatus.Loading) {
    return (
      <div className="grid grid-cols-1 px-4 gap-4 md:px-16 py-8 bg-white dark:bg-sky-950 dark:text-white md:grid-cols-[1fr_3fr]">
      <div className="flex justify-center items-center">
        <CardSkeleton isInDetail={true} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-10 w-64 bg-gray-300 dark:bg-sky-700 rounded-md animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-300 dark:bg-sky-700 rounded-md animate-pulse"></div>
        </div>
        <div className="h-12 w-12 bg-gray-300 dark:bg-sky-700 rounded-full animate-pulse"></div>
        <div className="flex flex-col gap-2">
          <div className="h-6 w-40 bg-gray-300 dark:bg-sky-700 rounded-md animate-pulse"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-11/12 bg-gray-300 dark:bg-sky-700 rounded-md animate-pulse"></div>
            <div className="h-4 w-10/12 bg-gray-300 dark:bg-sky-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  if (status === ApiStatus.Success && movieDetails) {
    setTitle(`${movieDetails.title} (${movieDetails.release_date?.split('-')[0]})`);

    return (
      <div className="grid grid-cols-1 px-4 gap-4 md:px-16 py-8 bg-white dark:bg-sky-950 dark:text-white md:grid-cols-[1fr_3fr]">
        <div className="flex justify-center items-start">
          <Image 
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movieDetails.poster_path}`} 
            alt={movieDetails.title ?? ''} 
            width={220} 
            height={330} 
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          {!accountId && !sessionId && (
            <Alert 
              message="Please login to add this movie to your favorites"
              type="error"
            />
          )}
          
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl"><strong>{movieDetails.title}</strong> ({movieDetails.release_date?.split('-')[0]})</h1>
            <span className="text-sm">{formatDate(movieDetails.release_date ?? '')} - {movieDetails.runtime}m</span>
          </div>
          <div className="flex gap-4">
            <div className={`rounded-md h-12 px-4 text-white bg-sky-950 dark:bg-sky-900 flex items-center justify-center gap-1 border-2 ${movieDetails.vote_average && movieDetails.vote_average > 70 ? 'border-green-500' : 'border-yellow-500'}`}>
              <strong>{Math.round((movieDetails.vote_average ?? 0) * 10)}%</strong>
              <span className="text-xs">User Score</span>
            </div>
            {accountId && sessionId && (
              <FavoriteButton 
                isFavorite={isFavorite} 
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Overview</h2>
            <p className="text-sm">
              {movieDetails.overview}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Genres</h2>
            <div className="flex gap-2">
              {movieDetails.genres?.map((genre) => (
                <span key={genre.id} className="text-sm bg-sky-950 dark:bg-sky-900 px-2 py-1 rounded-md text-white">{genre.name}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Production Companies</h2>
            <div className="flex gap-2">
              {movieDetails.production_companies?.map((company) => (
                <span key={company.id} className="text-sm dark:text-white">{company.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
