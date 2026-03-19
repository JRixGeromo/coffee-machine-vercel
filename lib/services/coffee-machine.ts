import { PrismaClient } from '@prisma/client';
import { Recipe } from '../Recipe';
import { CoffeeStatus, ApiResponse } from '@/types/coffee.types';

export class CoffeeMachineService {
  private prisma: PrismaClient;
  private recipes: Map<string, Recipe>;

  constructor() {
    this.prisma = new PrismaClient();
    this.recipes = this.initializeRecipes();
  }

  private initializeRecipes(): Map<string, Recipe> {
    return new Map([
      [
        'espresso',
        new Recipe(
          'espresso',
          'Espresso',
          8,
          24,
          'A concentrated coffee shot with rich flavor'
        ),
      ],
      [
        'double_espresso',
        new Recipe(
          'double_espresso',
          'Double Espresso',
          16,
          48,
          'Two shots of espresso for a stronger flavor'
        ),
      ],
      [
        'americano',
        new Recipe(
          'americano',
          'Americano',
          16,
          148,
          'Espresso diluted with hot water for a milder taste'
        ),
      ],
    ]);
  }

  /**
   * Get the current status of the coffee machine
   */
  async getStatus(): Promise<CoffeeStatus> {
    const state = await this.getOrCreateState();

    return {
      water: {
        current: state.waterMl / 1000, // Convert to liters
        capacity: 2,
        unit: 'liters',
        percentage: (state.waterMl / 2000) * 100,
      },
      coffee: {
        current: state.coffeeGrams,
        capacity: 500,
        unit: 'grams',
        percentage: (state.coffeeGrams / 500) * 100,
      },
      can_make: this.getAvailableCoffee(state),
    };
  }

  /**
   * Make coffee of the specified type
   */
  async makeCoffee(type: string): Promise<string> {
    const recipe = this.recipes.get(type);

    if (!recipe) {
      throw new Error(`Unknown coffee type: ${type}`);
    }

    const state = await this.getOrCreateState();

    // Check if we have enough resources
    if (!recipe.canMake(state.waterMl, state.coffeeGrams)) {
      const missingCoffee = Math.max(0, recipe.getCoffeeGrams() - state.coffeeGrams);
      const missingWater = Math.max(0, recipe.getWaterMilliliters() - state.waterMl);

      if (missingCoffee > 0 && missingWater > 0) {
        throw new Error(
          `Not enough resources. Need ${missingCoffee}g more coffee and ${missingWater}ml more water.`
        );
      } else if (missingCoffee > 0) {
        throw new Error(
          `Not enough coffee to make ${recipe.name}. Need ${missingCoffee}g more, but only ${state.coffeeGrams}g available.`
        );
      } else {
        throw new Error(
          `Not enough water to make ${recipe.name}. Need ${missingWater}ml more, but only ${state.waterMl}ml available.`
        );
      }
    }

    // Deduct resources
    await this.prisma.coffeeMachineState.update({
      where: { id: state.id },
      data: {
        waterMl: state.waterMl - recipe.getWaterMilliliters(),
        coffeeGrams: state.coffeeGrams - recipe.getCoffeeGrams(),
      },
    });

    return `${recipe.name} made successfully!`;
  }

  /**
   * Make espresso
   */
  async makeEspresso(): Promise<string> {
    return this.makeCoffee('espresso');
  }

  /**
   * Make double espresso
   */
  async makeDoubleEspresso(): Promise<string> {
    return this.makeCoffee('double_espresso');
  }

  /**
   * Make americano
   */
  async makeAmericano(): Promise<string> {
    return this.makeCoffee('americano');
  }

  /**
   * Fill water container
   */
  async fillWater(liters: number): Promise<string> {
    if (liters <= 0) {
      throw new Error('Water quantity must be positive');
    }

    const state = await this.getOrCreateState();
    const newWaterMl = state.waterMl + Math.round(liters * 1000);

    if (newWaterMl > 2000) {
      throw new Error(
        `Cannot add ${liters} liters. The water container would overflow (max 2 liters).`
      );
    }

    await this.prisma.coffeeMachineState.update({
      where: { id: state.id },
      data: { waterMl: newWaterMl },
    });

    return `Water container filled with ${liters} liters.`;
  }

  /**
   * Fill coffee container
   */
  async fillCoffee(grams: number): Promise<string> {
    if (grams <= 0) {
      throw new Error('Coffee quantity must be positive');
    }

    const state = await this.getOrCreateState();
    const newCoffeeGrams = state.coffeeGrams + grams;

    if (newCoffeeGrams > 500) {
      throw new Error(
        `Cannot add ${grams} grams. The coffee container would overflow (max 500 grams).`
      );
    }

    await this.prisma.coffeeMachineState.update({
      where: { id: state.id },
      data: { coffeeGrams: newCoffeeGrams },
    });

    return `Coffee container filled with ${grams} grams.`;
  }

  /**
   * Get all available recipes
   */
  getAllRecipes(): Recipe[] {
    return Array.from(this.recipes.values());
  }

  /**
   * Check if a recipe exists
   */
  hasRecipe(type: string): boolean {
    return this.recipes.has(type);
  }

  /**
   * Get a specific recipe
   */
  getRecipe(type: string): Recipe | undefined {
    return this.recipes.get(type);
  }

  /**
   * Get or create the machine state
   */
  private async getOrCreateState() {
    let state = await this.prisma.coffeeMachineState.findFirst();

    if (!state) {
      state = await this.prisma.coffeeMachineState.create({
        data: {
          waterMl: 0,
          coffeeGrams: 0,
        },
      });
    }

    return state;
  }

  /**
   * Get available coffee types based on current resources
   */
  private getAvailableCoffee(state: any): Record<string, boolean> {
    const available: Record<string, boolean> = {};

    for (const [key, recipe] of this.recipes) {
      available[key] = recipe.canMake(state.waterMl, state.coffeeGrams);
    }

    return available;
  }

  /**
   * Clean up Prisma connection
   */
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
