import { useNowPlayingMovies, usePopularMovies } from "@/api/movieApi";
import MovieSection from "@/components/layout/home/MovieSection";

export default function Home() {
  const [movies, status, error] = useNowPlayingMovies();
  const [popularMovies, popularStatus, popularError, loadMorePopularMovies] = usePopularMovies();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-6 bg-sky-100 px-4 md:px-16 py-8 dark:bg-sky-900 dark:text-white">
        <h1 className="text-2xl font-bold">Now Playing</h1>
        <MovieSection 
          data={movies} 
          status={status} 
          error={error} 
          isLoadMoreNeeded={false}
          onLoadMore={() => {}}
        />
      </div>
      <div className="flex flex-col gap-6 px-4 md:px-16 py-8 bg-white dark:bg-sky-950 dark:text-white">
        <h1 className="text-2xl font-bold">Popular</h1>
        <MovieSection 
          data={popularMovies} 
          status={popularStatus} 
          error={popularError} 
          isLoadMoreNeeded={true}
          onLoadMore={loadMorePopularMovies}
        />
      </div>
    </div>
  )
}