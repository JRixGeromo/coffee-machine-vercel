import { CoffeeMachineApp } from '@/components/CoffeeMachine/CoffeeMachineApp';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <CoffeeMachineApp />
      </div>
    </main>
  );
}
