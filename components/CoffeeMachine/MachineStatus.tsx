'use client';

import { CoffeeStatus } from '@/types/coffee.types';

interface MachineStatusProps {
  status: CoffeeStatus | null;
  onRefresh: () => void;
  loading: boolean;
}

export function MachineStatus({ status, onRefresh, loading }: MachineStatusProps) {
  if (!status) {
    return (
      <div className="coffee-card">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coffee machine status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="coffee-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Machine Status</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Water Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              💧 Water
            </h3>
            <span className="text-sm font-medium text-gray-600">
              {status.water.percentage.toFixed(1)}% full
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ 
                width: `${status.water.percentage}%`,
                background: 'linear-gradient(to right, #60a5fa, #2563eb)'
              }}
            >
              {status.water.percentage > 15 && (
                <span className="text-xs font-bold text-white">
                  {status.water.percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 text-center font-medium">
            {status.water.current.toFixed(3)} / {status.water.capacity} {status.water.unit}
          </p>
        </div>

        {/* Coffee Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-amber-600 flex items-center gap-2">
              ☕ Coffee
            </h3>
            <span className="text-sm font-medium text-gray-600">
              {status.coffee.percentage.toFixed(1)}% full
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ 
                width: `${status.coffee.percentage}%`,
                background: 'linear-gradient(to right, #fbbf24, #d97706)'
              }}
            >
              {status.coffee.percentage > 15 && (
                <span className="text-xs font-bold text-white">
                  {status.coffee.percentage.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 text-center font-medium">
            {status.coffee.current} / {status.coffee.capacity} {status.coffee.unit}
          </p>
        </div>
      </div>

      {/* Available Coffee Types */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Available Coffee Types</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(status.can_make).map(([type, canMake]) => (
            <span
              key={type}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                canMake
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              {canMake ? ' ✅' : ' ❌'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
