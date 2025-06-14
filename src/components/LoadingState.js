export default function LoadingState() {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="h-8 bg-slate-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3"></div>
          </div>
          <div className="text-right">
            <div className="h-12 w-24 bg-slate-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-16 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="h-6 bg-slate-200 rounded animate-pulse mb-4"></div>
            <div className="h-8 bg-slate-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}