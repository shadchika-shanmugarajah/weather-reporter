import MetricCard from './MetricCard';
import { getUVDescription, getUVColor } from '../lib/weather-api';


const MapPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RefreshCw = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Thermometer = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a6 6 0 0012 0v-3" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

export default function WeatherDisplay({ data, lastUpdated, loading }) {
  const { location, current } = data;

  return (
    <div className="animate-fade-in">
      {/* Main Weather Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={`https:${current.condition.icon}`} 
                alt={current.condition.text}
                className="w-16 h-16"
              />
              <div>
                <h2 className="text-2xl font-bold">{location.name}</h2>
                <p className="text-blue-100">{location.country}</p>
                <p className="text-blue-200 text-sm">{current.condition.text}</p>
                <p className="text-blue-200 text-xs mt-1">
                  {new Date(location.localtime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{current.temp_c}°C</div>
              <div className="text-blue-200 text-sm">
                Feels like {current.feelslike_c}°C
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin />
                <span>Last updated: {lastUpdated?.toLocaleString() || 'Loading...'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Local time: {new Date(location.localtime).toLocaleString()}</span>
              </div>
            </div>
            {loading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Updating...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon="💧"
          title="Humidity"
          value={`${current.humidity}%`}
          subtitle="Moisture level"
          color="blue"
        />
        <MetricCard
          icon="💨"
          title="Wind Speed"
          value={`${current.wind_kph} km/h`}
          subtitle="Current wind"
          color="green"
        />
        <MetricCard
          icon="☀️"
          title="UV Index"
          value={current.uv.toString()}
          subtitle={getUVDescription(current.uv)}
          color={getUVColor(current.uv)}
        />
        <MetricCard
          icon="🌡️"
          title="Pressure"
          value={`${current.pressure_mb} mb`}
          subtitle="Atmospheric"
          color="purple"
        />
      </div>

      {/* Weather Details */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <span className="mr-2">🌤️</span>
          Weather Details
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-semibold text-slate-900">{current.visibility_km} km</div>
            <div className="text-slate-600 text-sm">Visibility</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Thermometer className="w-6 h-6 text-green-600" />
            </div>
            <div className="font-semibold text-slate-900">{current.feelslike_c}°C</div>
            <div className="text-slate-600 text-sm">Feels Like</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-semibold text-slate-900">
              {new Date(location.localtime).toLocaleTimeString()}
            </div>
            <div className="text-slate-600 text-sm">Local Time</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg">📊</span>
            </div>
            <div className="font-semibold text-slate-900">{current.pressure_mb} mb</div>
            <div className="text-slate-600 text-sm">Pressure</div>
          </div>
        </div>
      </div>
    </div>
  );
}