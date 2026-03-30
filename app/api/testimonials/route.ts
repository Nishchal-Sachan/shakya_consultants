import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { uploadImage } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/testimonials ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch testimonials', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Authenticate (Assumed admin action for curating testimonials)
    const decoded = await verifyAuth(req);
    if (!decoded) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;
    const role = formData.get('role') as string || '';
    const company = formData.get('company') as string || '';
    const rating = Number(formData.get('rating')) || 5;
    const imageFile = formData.get('image') as File | null;

    // Validation
    if (!name || !message) {
      return NextResponse.json({ success: false, error: 'Name and message are required' }, { status: 400 });
    }

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      // Check file size (10MB Limit)
      if (imageFile.size > MAX_FILE_SIZE) {
          return NextResponse.json({ 
            success: false, 
            error: 'Image file too large. Maximum allowed size is 10MB.' 
          }, { status: 400 });
      }

      // Convert File to Buffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      imageUrl = await uploadImage(buffer);
    }

    // Save to Database
    const testimonial = await Testimonial.create({
      name,
      message,
      role,
      company,
      rating,
      imageUrl,
    });

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/testimonials ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Server error',
      details: error.stack
    }, { status: 500 });
  }
}
