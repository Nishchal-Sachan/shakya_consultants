import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';
import { verifyAuth } from '@/lib/auth';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    // Authenticate
    const decoded = await verifyAuth(req);
    if (!decoded) {
        return NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params; // Next.js 15 requires awaiting params
    
    if (!id) {
        return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Client deleted' }, { status: 200 });
  } catch (error: any) {
      console.error('DELETE /api/clients/[id] ERROR:', error);
    return NextResponse.json({ 
        success: false, 
        error: 'Failed to delete client',
        details: error.message 
    }, { status: 500 });
  }
}
