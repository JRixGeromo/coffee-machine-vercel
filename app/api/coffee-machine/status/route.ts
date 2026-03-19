import { NextRequest, NextResponse } from 'next/server';
import { CoffeeMachineService } from '@/lib/services/coffee-machine';

export async function GET(request: NextRequest) {
  try {
    const service = new CoffeeMachineService();
    const status = await service.getStatus();
    
    return NextResponse.json({
      success: true,
      message: 'Status retrieved successfully',
      status
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch status' 
      },
      { status: 500 }
    );
  }
}
