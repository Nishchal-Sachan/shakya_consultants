import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { uploadImage } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function GET() {
  try {
    console.log('GET /api/projects - Connecting to DB...');
    await dbConnect();
    console.log('GET /api/projects - Fetching projects...');
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/projects ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch projects', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. Authenticate Request
    const decoded = await verifyAuth(req);
    if (!decoded) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid or missing token' }, { status: 401 });
    }

    await dbConnect();
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const projectLink = formData.get('projectLink') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description || !projectLink || !imageFile) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    // Check file size (10MB Limit)
    if (imageFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        success: false, 
        error: 'File too large. Maximum allowed size is 10MB.' 
      }, { status: 400 });
    }

    // Convert File to Buffer for streaming upload to Cloudinary (more reliable)
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using direct Buffer for better performance/reliability
    const imageUrl = await uploadImage(buffer);

    // Save to Database
    const project = await Project.create({
      title,
      description,
      imageUrl,
      projectLink,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/projects ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal server error',
      details: error.stack
    }, { status: 500 });
  }
}
