'use client';

interface CoffeeButtonsProps {
  canMake: Record<string, boolean>;
  loading: boolean;
  onMakeCoffee: (type: string) => void;
}

export function CoffeeButtons({ canMake, loading, onMakeCoffee }: CoffeeButtonsProps) {
  const coffeeTypes = [
    {
      key: 'espresso',
      name: 'Espresso',
      icon: '☕',
      recipe: '8g coffee, 24ml water',
    },
    {
      key: 'double_espresso',
      name: 'Double Espresso',
      icon: '☕☕',
      recipe: '16g coffee, 48ml water',
    },
    {
      key: 'americano',
      name: 'Americano',
      icon: '🥤',
      recipe: '16g coffee, 148ml water',
    },
  ];

  return (
    <div className="coffee-card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Make Coffee</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coffeeTypes.map((coffee) => (
          <button
            key={coffee.key}
            onClick={() => onMakeCoffee(coffee.key)}
            disabled={!canMake[coffee.key] || loading}
            className="coffee-button p-6 text-center space-y-3"
          >
            <div className="text-3xl">{coffee.icon}</div>
            <div className="font-bold text-lg">{coffee.name}</div>
            <div className="text-sm opacity-90">{coffee.recipe}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
