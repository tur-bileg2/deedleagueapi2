export default function PlayerDetailsSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-6xl animate-pulse">
      {/* Header Skeleton */}
      <div className="h-10 bg-gray-200 rounded w-2/3 mb-6"></div>
      
      {/* Basic Info Card Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6 flex flex-col md:flex-row items-start">
        {/* Player Image Skeleton */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <div className="w-24 h-36 bg-gray-200 rounded"></div>
        </div>
        {/* Player Details Text Skeleton */}
        <div className="flex-grow w-full">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stats Overview Card Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-12 h-4 bg-gray-200 rounded mr-2"></div>
                <div className="flex-grow h-5 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-16 rounded"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tables Skeleton */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="overflow-x-auto">
            <div className="h-60 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
