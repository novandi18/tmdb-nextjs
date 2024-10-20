import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
export default function FavoriteButton(
  {
    isFavorite,
    onToggleFavorite
  }: {
    isFavorite: boolean;
    onToggleFavorite: () => void;
  }
) {
  return (
    <button className="bg-white/20 border border-red-500 p-3 rounded-full flex items-center gap-2 w-fit text-red-500 hover:bg-red-500/25" onClick={onToggleFavorite}>
      {
        isFavorite ? <HeartIconSolid className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />
      }
    </button>
  )
}