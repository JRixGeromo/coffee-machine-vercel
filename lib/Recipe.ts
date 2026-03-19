/**
 * Recipe Value Object
 * 
 * Encapsulates coffee recipe data with validation and business logic.
 * This is a domain object that represents a coffee type with its
 * resource requirements.
 */
export class Recipe {
  private readonly _key: string;
  private readonly _name: string;
  private readonly _coffeeGrams: number;
  private readonly _waterMilliliters: number;
  private readonly _description?: string;

  constructor(
    key: string,
    name: string,
    coffeeGrams: number,
    waterMilliliters: number,
    description?: string
  ) {
    this.validate(key, name, coffeeGrams, waterMilliliters);
    
    this._key = key;
    this._name = name;
    this._coffeeGrams = coffeeGrams;
    this._waterMilliliters = waterMilliliters;
    this._description = description;
  }

  private validate(
    key: string,
    name: string,
    coffeeGrams: number,
    waterMilliliters: number
  ): void {
    if (!key || key.trim().length === 0) {
      throw new Error('Recipe key cannot be empty');
    }

    if (!name || name.trim().length === 0) {
      throw new Error('Recipe name cannot be empty');
    }

    if (coffeeGrams <= 0) {
      throw new Error('Coffee grams must be positive');
    }

    if (waterMilliliters <= 0) {
      throw new Error('Water milliliters must be positive');
    }
  }

  get key(): string {
    return this._key;
  }

  get name(): string {
    return this._name;
  }

  get coffeeGrams(): number {
    return this._coffeeGrams;
  }

  get waterMilliliters(): number {
    return this._waterMilliliters;
  }

  get description(): string | undefined {
    return this._description;
  }

  /**
   * Check if this recipe can be made with given resources
   */
  canMake(waterMl: number, coffeeGrams: number): boolean {
    return waterMl >= this._waterMilliliters && coffeeGrams >= this._coffeeGrams;
  }

  /**
   * Get the amount of coffee needed
   */
  getCoffeeGrams(): number {
    return this._coffeeGrams;
  }

  /**
   * Get the amount of water needed
   */
  getWaterMilliliters(): number {
    return this._waterMilliliters;
  }

  /**
   * Convert to plain object
   */
  toJSON(): {
    key: string;
    name: string;
    coffeeGrams: number;
    waterMilliliters: number;
    description?: string;
  } {
    return {
      key: this._key,
      name: this._name,
      coffeeGrams: this._coffeeGrams,
      waterMilliliters: this._waterMilliliters,
      description: this._description,
    };
  }

  /**
   * Create Recipe from plain object
   */
  static fromJSON(data: {
    key: string;
    name: string;
    coffeeGrams: number;
    waterMilliliters: number;
    description?: string;
  }): Recipe {
    return new Recipe(
      data.key,
      data.name,
      data.coffeeGrams,
      data.waterMilliliters,
      data.description
    );
  }
}
