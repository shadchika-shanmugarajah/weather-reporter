import { useState, useCallback } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchWeatherData } from './lib/weather-api';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

const Cloud = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const RefreshCw = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function WeatherApp() {
  const [lastUpdated, setLastUpdated] = useState(null);

  const { data: weatherData, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', 'colombo'],
    queryFn: fetchWeatherData,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    onSuccess: () => {
      setLastUpdated(new Date());
    },
  });

  const handleRefresh = useCallback(async () => {
    await refetch();
    setLastUpdated(new Date());
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Weather Reporter</h1>
                <p className="text-slate-600 text-sm">Current weather conditions</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading && !weatherData && <LoadingState />}
        {error && <ErrorState error={error.message} onRetry={handleRefresh} />}
        {weatherData && (
          <WeatherDisplay 
            data={weatherData} 
            lastUpdated={lastUpdated}
            loading={isLoading}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;