import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-72 border-r border-base-300 flex flex-col bg-base-200/50">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-base-300 animate-pulse" />
            <div className="h-4 w-20 bg-base-300 rounded-full animate-pulse" />
          </div>
          <div className="w-8 h-8 rounded-full bg-base-300 animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-10 w-full bg-base-300 rounded-xl animate-pulse" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-base-300 animate-pulse" />
              <div className="h-3 w-24 bg-base-300 rounded-full animate-pulse" />
            </div>
            <div className="h-3 w-12 bg-base-300 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-2">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="px-4">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-base-300/50">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-base-300 animate-pulse" />
                {item % 2 === 0 && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-base-300 animate-pulse 
                               ring-2 ring-base-100" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-base-300 rounded-full animate-pulse" />
                <div className="h-2 w-16 bg-base-300 rounded-full animate-pulse opacity-50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-base-300 p-4">
        <div className="h-8 w-full bg-base-300 rounded-lg animate-pulse" />
      </div>
    </aside>
  );
};

export default SidebarSkeleton;