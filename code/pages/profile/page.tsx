import { useGetAccountDetails } from "@/api/accountApi";
import { useGetFavoriteMovies } from "@/api/movieFavoriteApi";
import CardSkeleton from "@/components/common/CardSkeleton";
import MovieSection from "@/components/layout/home/MovieSection";
import { ApiStatus } from "@/types/apiStatus";
import Image from "next/image";

export default function ProfilePage(
  {
    accountId,
    sessionId
  }: {
    accountId: string;
    sessionId: string;
  }
) {
  const [account, accountStatus, accountError] = useGetAccountDetails(
    sessionId
  );
  const [favoriteMovies, favoriteStatus, favoriteError] = useGetFavoriteMovies(
    accountId,
    sessionId
  );

  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-[1fr_4fr] gap-4 bg-sky-100 px-4 md:px-16 py-8 dark:bg-sky-900 dark:text-white">
        {accountStatus === ApiStatus.Success && (
          <>
            <div className="flex justify-center items-center">
              <Image
              src={`https://media.themoviedb.org/t/p/w300_and_h300_face/${account?.avatar.tmdb.avatar_path}`}
              alt="Avatar"
              width={150}
              height={150}
              className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">{account?.name}</h1>
              <span className="text-sm text-gray-500 dark:text-sky-400">{account?.username}</span>
            </div>
          </>
        )}

        {accountStatus === ApiStatus.Loading && (
          <>
            <div className="w-40 h-40 rounded-full bg-sky-300 dark:bg-sky-700 animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <div className="w-72 h-8 bg-sky-300 dark:bg-sky-700 animate-pulse rounded-md"></div>
              <div className="w-32 h-5 bg-sky-300 dark:bg-sky-700 animate-pulse rounded-md"></div>
            </div>
          </>
        )}

        {accountError && (
          <div className="flex flex-col gap-4 items-center justify-center mt-16">
            <span className="text-sky-950 dark:text-white">{accountError.message}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-600" onClick={() => {
              if (accountId && sessionId) {
                window.location.reload();
              }
            }}>Reload</button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 bg-white px-4 md:px-16 dark:bg-sky-950 dark:text-white pb-16 pt-8">
        <h1 className="text-xl font-bold">Favorite Movies</h1>
        {favoriteStatus === ApiStatus.Loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
          </div>
        )}

        {favoriteStatus === ApiStatus.Success && favoriteMovies && (
          <MovieSection 
            data={favoriteMovies} 
            status={favoriteStatus} 
            error={favoriteError} 
            isLoadMoreNeeded={false} 
            onLoadMore={() => {}} 
          />
        )}

        {favoriteError && (
          <div className="flex flex-col gap-4 items-center justify-center mt-16">
            <span className="text-sky-950 dark:text-white">{favoriteError.message}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-600" onClick={() => {
              if (accountId && sessionId) {
                window.location.reload();
              }
            }}>Reload</button>
          </div>
        )}

        {favoriteStatus === ApiStatus.Success && !favoriteMovies && (
          <div className="flex flex-col gap-4 items-center justify-center mt-16">
            <span className="text-sky-950 dark:text-white">No favorite movies found</span>
          </div>
        )}
      </div>
    </div>
  );
}