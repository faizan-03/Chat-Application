const MessageSkeleton = () => {
  return (
    <div className="flex-1 p-4 space-y-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className={`flex ${item % 2 === 0 ? "justify-end" : "justify-start"} gap-3`}
        >
          <div className="flex gap-3 max-w-[75%]">
            <div
              className={`h-10 w-10 rounded-xl bg-base-300 animate-pulse
                       ${item % 2 === 0 ? "order-2" : "order-1"}`}
            />
            <div className={`space-y-2 ${item % 2 === 0 ? "order-1" : "order-2"}`}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-24 bg-base-300 rounded-full animate-pulse" />
                <div className="h-2 w-12 bg-base-300 rounded-full animate-pulse opacity-50" />
              </div>
              <div className="space-y-2">
                <div className="h-16 w-64 bg-base-300 rounded-xl animate-pulse" />
                <div className="h-16 w-48 bg-base-300 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;