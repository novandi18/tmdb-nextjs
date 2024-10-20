import { Movie } from "@/interfaces/movie";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function Card({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="flex-none w-40 flex flex-col justify-between hover:scale-105 transition-all duration-300">
      <div className="flex flex-col">
        <Image
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
          alt="movie"
          height={330}
          width={220}
          className="object-cover rounded-lg shadow-sm"
        />
        <h3 className="font-bold text-sky-950 dark:text-white text-base mx-2 mt-2">{movie.title}</h3>
        <p className="max-w-sm text-gray-700 dark:text-sky-200 text-xs mx-2 mb-2">
          {movie.release_date ? formatDate(movie.release_date) : ''}
        </p>
      </div>
      <p className="flex max-w-sm text-gray-700 dark:text-sky-200 text-xs mx-2 mb-2 gap-1">
        <strong>{Math.round(movie.vote_average * 10)}%</strong>
        <span className="text-xs">User Score</span>
      </p>
    </Link>
  )
}