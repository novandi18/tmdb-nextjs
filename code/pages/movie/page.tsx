import { usePopularMovies } from "@/api/movieApi";
import MovieSection from "@/components/layout/home/MovieSection";

export default function MoviePage() {
  const [popularMovies, popularStatus, popularError, loadMorePopularMovies] = usePopularMovies(30, 30);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-16 py-8 bg-white dark:bg-sky-950 dark:text-white">
      <h1 className="text-2xl font-bold">Popular Movies</h1>
      <MovieSection 
        data={popularMovies} 
        status={popularStatus} 
        error={popularError} 
        isLoadMoreNeeded={true}
        onLoadMore={loadMorePopularMovies}
      />
    </div>
  )
}