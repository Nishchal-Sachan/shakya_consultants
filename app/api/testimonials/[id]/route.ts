import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Testimonial from '@/models/Testimonial';
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
    const { id } = await params;
    
    if (!id) {
        return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted' }, { status: 200 });
  } catch (error: any) {
      console.error('DELETE /api/testimonials/[id] ERROR:', error);
    return NextResponse.json({ 
        success: false, 
        error: 'Failed to delete testimonial',
        details: error.message 
    }, { status: 500 });
  }
}
