import { NextRequest, NextResponse } from 'next/server';
import { CoffeeMachineService } from '@/lib/services/coffee-machine';

export async function POST(request: NextRequest) {
  try {
    const service = new CoffeeMachineService();
    const result = await service.makeAmericano();
    const status = await service.getStatus();
    
    return NextResponse.json({
      success: true,
      message: result,
      status
    });
  } catch (error) {
    console.error('Error making americano:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to make americano' 
      },
      { status: 400 }
    );
  }
}
