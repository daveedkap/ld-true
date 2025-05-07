export default function ListingSkeleton() {
    return (
      <div className="skeleton rounded-xl shadow-md border border-gray-200">
        <div className="relative w-full aspect-[3/4] bg-gray-300" />
        <div className="p-4 space-y-2">
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 rounded" />
        </div>
      </div>
    )
  }  