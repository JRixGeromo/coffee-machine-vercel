'use client';

import { useState, useCallback, useEffect } from 'react';
import { CoffeeStatus, ApiResponse } from '@/types/coffee.types';

interface UseCoffeeMachineReturn {
  status: CoffeeStatus | null;
  loading: boolean;
  message: string;
  makeCoffee: (type: string) => Promise<void>;
  fillWater: (quantity: number) => Promise<void>;
  fillCoffee: (quantity: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useCoffeeMachine(): UseCoffeeMachineReturn {
  const [status, setStatus] = useState<CoffeeStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/coffee-machine/status');
      const data: ApiResponse = await response.json();
      
      if (data.success && data.status) {
        setStatus(data.status);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to fetch status');
    }
  }, []);

  const makeCoffee = useCallback(async (type: string) => {
    setLoading(true);
    setMessage('');
    
    try {
      const endpoint = `/api/coffee-machine/make-${type.replace('_', '-')}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setStatus(data.status || null);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(`Failed to make ${type}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fillWater = useCallback(async (quantity: number) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/coffee-machine/fill-water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setStatus(data.status || null);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to fill water');
    } finally {
      setLoading(false);
    }
  }, []);

  const fillCoffee = useCallback(async (quantity: number) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/coffee-machine/fill-coffee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setStatus(data.status || null);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to fill coffee');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize status on mount
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    loading,
    message,
    makeCoffee,
    fillWater,
    fillCoffee,
    refetch: fetchStatus,
  };
}
