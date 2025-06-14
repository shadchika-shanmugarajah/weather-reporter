export default function MetricCard({ icon, title, value, subtitle, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    red: 'bg-red-100 text-red-600 border-red-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 h-full flex flex-col">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${colorClasses[color] || colorClasses.blue}`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="space-y-1 flex-1 flex flex-col justify-between">
        <h3 className="text-slate-600 text-sm font-medium">{title}</h3>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}