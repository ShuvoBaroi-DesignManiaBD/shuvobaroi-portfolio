import React from 'react'

export const HeroSkeleton = () => {
  return (
    <div className="py-32">
  {/* Spotlights Skeleton */}
  <div className="relative">
    <div className="absolute -top-40 -left-10 md:-left-32 md:-top-20 h-screen rounded-full opacity-50"></div>
    <div className="absolute h-[80vh] w-[50vw] top-10 left-full rounded-full opacity-50"></div>
    <div className="absolute left-80 top-28 h-[80vh] w-[50vw] rounded-full opacity-50"></div>
  </div>

  {/* Background Grid Skeleton */}
  <div className="h-screen w-full absolute top-0 left-0 flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-transparent pointer-events-none"></div>
  </div>

  {/* Main Content Skeleton */}
  <div className="flex justify-between gap-32 relative z-10">
    {/* Left Column Skeleton */}
    <div className="md:w-[40%] flex flex-col items-start justify-center space-y-6">
      <div className="h-4 w-32 bg-gray-600 rounded animate-pulse"></div>
      <div className="h-6 w-4/5 bg-gray-700 rounded animate-pulse"></div>
      <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>
      <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>
      <div className="h-3 w-full bg-gray-700 rounded animate-pulse"></div>

      {/* Buttons Skeleton */}
      <div className="flex gap-3">
        <div className="h-10 w-32 bg-gray-600 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-600 rounded animate-pulse"></div>
      </div>
    </div>

    {/* Right Column Skeleton (Image Placeholder) */}
    <div className="h-56 w-56 md:h-96 md:w-96 bg-gray-400 rounded-full animate-pulse"></div>
  </div>
</div>

  )
}
