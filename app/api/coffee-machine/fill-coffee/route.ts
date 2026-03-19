import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CoffeeMachineService } from '@/lib/services/coffee-machine';

const fillCoffeeSchema = z.object({
  quantity: z.number().positive().max(500),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quantity } = fillCoffeeSchema.parse(body);
    
    const service = new CoffeeMachineService();
    const result = await service.fillCoffee(quantity);
    const status = await service.getStatus();
    
    return NextResponse.json({
      success: true,
      message: result,
      status
    });
  } catch (error) {
    console.error('Error filling coffee:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid input: quantity must be a positive number up to 500 grams' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fill coffee' 
      },
      { status: 400 }
    );
  }
}
