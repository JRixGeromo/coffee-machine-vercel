'use client';

import { useState } from 'react';

interface ContainerControlsProps {
  loading: boolean;
  onFillWater: (quantity: number) => void;
  onFillCoffee: (quantity: number) => void;
}

export function ContainerControls({ loading, onFillWater, onFillCoffee }: ContainerControlsProps) {
  const [waterQuantity, setWaterQuantity] = useState('');
  const [coffeeQuantity, setCoffeeQuantity] = useState('');

  const handleFillWater = () => {
    const quantity = parseFloat(waterQuantity);
    if (quantity > 0 && quantity <= 2) {
      onFillWater(quantity);
      setWaterQuantity('');
    }
  };

  const handleFillCoffee = () => {
    const quantity = parseFloat(coffeeQuantity);
    if (quantity > 0 && quantity <= 500) {
      onFillCoffee(quantity);
      setCoffeeQuantity('');
    }
  };

  return (
    <div className="coffee-card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Fill Containers</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Water Control */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-lg font-semibold text-blue-600 flex items-center mb-2">
              💧 Water (liters)
            </span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="2"
                placeholder="0.0"
                value={waterQuantity}
                onChange={(e) => setWaterQuantity(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={handleFillWater}
                disabled={!waterQuantity || loading}
                className="water-button px-6 py-2"
              >
                Fill
              </button>
            </div>
            <p className="text-sm text-gray-500">Max: 2 liters</p>
          </label>
        </div>

        {/* Coffee Control */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-lg font-semibold text-amber-600 flex items-center mb-2">
              ☕ Coffee (grams)
            </span>
            <div className="flex gap-2">
              <input
                type="number"
                step="1"
                min="1"
                max="500"
                placeholder="0"
                value={coffeeQuantity}
                onChange={(e) => setCoffeeQuantity(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
              />
              <button
                onClick={handleFillCoffee}
                disabled={!coffeeQuantity || loading}
                className="coffee-button px-6 py-2"
              >
                Fill
              </button>
            </div>
            <p className="text-sm text-gray-500">Max: 500 grams</p>
          </label>
        </div>
      </div>
    </div>
  );
}
