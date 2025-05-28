export default function BuildingStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-800/50 rounded-lg p-4 border border-purple-900/30 animate-pulse"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg" />
            <div className="h-6 bg-gray-700 rounded w-32" />
          </div>
          
          <div className="space-y-2">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="h-4 bg-gray-700 rounded w-20" />
                <div className="h-4 bg-gray-700 rounded w-8" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 