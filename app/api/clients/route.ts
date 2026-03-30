import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';
import { uploadImage } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function GET() {
  try {
    console.log('GET /api/clients - Connecting to DB...');
    await dbConnect();
    console.log('GET /api/clients - Fetching clients...');
    const clients = await Client.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: clients }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/clients ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch clients', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Authenticate
    const decoded = await verifyAuth(req);
    if (!decoded) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const logoFile = formData.get('logo') as File | null;

    if (!name || !logoFile) {
      return NextResponse.json({ success: false, error: 'Name and logo are required' }, { status: 400 });
    }

    // Check file size (10MB Limit)
    if (logoFile.size > MAX_FILE_SIZE) {
        return NextResponse.json({ 
          success: false, 
          error: 'File too large. Maximum allowed size is 10MB.' 
        }, { status: 400 });
    }

    // Convert logo File to Buffer for direct streaming upload (more reliable)
    const arrayBuffer = await logoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using direct Buffer for better performance/reliability
    const logoUrl = await uploadImage(buffer);

    // Save to Database
    const client = await Client.create({
      name,
      logoUrl,
    });

    return NextResponse.json({ success: true, data: client }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/clients ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Server error',
      details: error.stack
    }, { status: 500 });
  }
}
