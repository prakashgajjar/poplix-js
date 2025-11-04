

export default function AllFollowUsersSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-2 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-6 h-6 bg-neutral-700 rounded" />
        <div className="h-6 w-24 bg-neutral-700 rounded" />
      </div>

      {/* Search Bar */}
      <div className="w-full h-10 bg-neutral-800 rounded-xl mb-4" />

      {/* Skeleton User Items */}
      <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-700 rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-neutral-700 rounded" />
                <div className="w-16 h-3 bg-neutral-800 rounded" />
              </div>
            </div>
            <div className="w-20 h-8 bg-neutral-800 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
