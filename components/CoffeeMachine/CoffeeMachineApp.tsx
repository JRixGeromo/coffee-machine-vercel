'use client';

import { useCoffeeMachine } from '@/hooks/useCoffeeMachine';
import { MachineStatus } from './MachineStatus';
import { CoffeeButtons } from './CoffeeButtons';
import { ContainerControls } from './ContainerControls';
import { MessageDisplay } from './MessageDisplay';

export function CoffeeMachineApp() {
  const { 
    status, 
    loading, 
    message, 
    makeCoffee, 
    fillWater, 
    fillCoffee,
    refetch 
  } = useCoffeeMachine();

  return (
    <div className="w-full max-w-6xl px-4 py-8">
      <div className="w-full">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 animate-fade-in">
            ☕ Coffee Machine
          </h1>
          <p className="text-gray-600 text-lg">
            Next.js 14 Full-Stack Application
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Status Display */}
          <MachineStatus 
            status={status}
            onRefresh={refetch}
            loading={loading}
          />
          
          {/* Coffee Making Buttons */}
          <CoffeeButtons 
            canMake={status?.can_make || {}}
            loading={loading}
            onMakeCoffee={makeCoffee}
          />
          
          {/* Container Controls */}
          <ContainerControls 
            loading={loading}
            onFillWater={fillWater}
            onFillCoffee={fillCoffee}
          />
          
          {/* Message Display */}
          <MessageDisplay 
            message={message}
            onClose={() => {}}
          />
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Built with Next.js 14, TypeScript, PostgreSQL & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}
