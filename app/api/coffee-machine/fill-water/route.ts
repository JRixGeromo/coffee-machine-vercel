import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CoffeeMachineService } from '@/lib/services/coffee-machine';

const fillWaterSchema = z.object({
  quantity: z.number().positive().max(2),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quantity } = fillWaterSchema.parse(body);
    
    const service = new CoffeeMachineService();
    const result = await service.fillWater(quantity);
    const status = await service.getStatus();
    
    return NextResponse.json({
      success: true,
      message: result,
      status
    });
  } catch (error) {
    console.error('Error filling water:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid input: quantity must be a positive number up to 2 liters' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fill water' 
      },
      { status: 400 }
    );
  }
}
