export interface CoffeeStatus {
  water: ResourceStatus;
  coffee: ResourceStatus;
  can_make: Record<string, boolean>;
}

export interface ResourceStatus {
  current: number;
  capacity: number;
  unit: string;
  percentage: number;
}

export interface Recipe {
  key: string;
  name: string;
  coffeeGrams: number;
  waterMilliliters: number;
  description?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  status?: CoffeeStatus;
  data?: T;
}

export interface CoffeeMachineState {
  id: number;
  waterMl: number;
  coffeeGrams: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MakeCoffeeRequest {
  type: 'espresso' | 'double_espresso' | 'americano';
}

export interface FillContainerRequest {
  quantity: number;
}
