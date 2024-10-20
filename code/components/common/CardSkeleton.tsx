export default function CardSkeleton({isInDetail = false}: {isInDetail: boolean}) {
  return (
    <div className={`animate-pulse rounded-md ${isInDetail ? 'w-56 h-80' : 'w-40 h-72'}`}>
      <div className="w-full h-full bg-gray-200 dark:bg-sky-700 rounded-md"></div>
    </div>
  )
}
