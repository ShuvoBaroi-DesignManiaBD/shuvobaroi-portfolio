export const AboutMeSkeleton = () => {
  return (
    <div>
  {/* Heading Skeleton */}
  <div className="animate-pulse">
    <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
    <div className="h-8 w-48 bg-gray-800 rounded"></div>
  </div>

  {/* Paragraph Skeleton */}
  <div className="animate-pulse mt-4">
    <div className="h-4 w-full max-w-3xl bg-gray-700 rounded mb-2"></div>
    <div className="h-4 w-full max-w-lg bg-gray-700 rounded mb-2"></div>
    <div className="h-4 w-full max-w-sm bg-gray-700 rounded"></div>
  </div>

  {/* Cards Skeleton */}
  <div className="mt-20 flex gap-10">
    {[1, 2, 3].map((_, index) => (
      <div
        key={index}
        className="animate-pulse w-full xs:w-[250px] p-4 bg-gray-800 rounded-[20px] flex flex-col items-center space-y-4"
      >
        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
        <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
      </div>
    ))}
  </div>
</div>

  )
}
