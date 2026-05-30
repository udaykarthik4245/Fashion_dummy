// Skeleton loaders shown while data is fetching, to improve perceived performance.

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="skeleton aspect-square w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="skeleton aspect-square rounded-lg" />
      <div className="space-y-3">
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-8 w-1/3 rounded" />
        <div className="skeleton h-24 w-full rounded" />
        <div className="skeleton h-10 w-1/2 rounded" />
      </div>
    </div>
  );
}
