import Card from "@/components/common/Card";
import CardSkeleton from "@/components/common/CardSkeleton";
import { Movie, MovieResponse } from "@/interfaces/movie";
import { ApiStatus } from "@/types/apiStatus";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

export default function MovieSection({
  data,
  status,
  error,
  isLoadMoreNeeded = false,
  onLoadMore
}: {
  data: MovieResponse;
  status: ApiStatus;
  error: Error | null;
  isLoadMoreNeeded: boolean;
  onLoadMore: () => void;
}) {
  if (status === ApiStatus.Error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {
          status === ApiStatus.Success && data.results.length > 0 ?
            data.results.map((item: Movie) => (
              <Card key={item.id} movie={item} />
            )) : <div>No movies found</div>
        }
      </div>
      {
        status === ApiStatus.Loading &&
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
            <CardSkeleton isInDetail={false} />
          </div>
      }
      {(isLoadMoreNeeded && data.results.length > 0) && (
        <button 
          className="w-full bg-sky-800 text-white px-4 rounded-md flex items-center justify-center gap-2 py-4 hover:bg-sky-900 transition-all duration-300 disabled:bg-sky-900 disabled:cursor-not-allowed"
          onClick={onLoadMore}
          disabled={status === ApiStatus.Loading}
        >
          <ArrowPathIcon className="w-4 h-4" />
          <span className="text-sm">Load More</span>
        </button>
      )}
    </div>
  )
}