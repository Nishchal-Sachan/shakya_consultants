import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { uploadImage } from '@/lib/cloudinary';
import { verifyAuth } from '@/lib/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type ParamsProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(req: Request, { params }: ParamsProps) {
  try {
    // Authenticate
    const decoded = await verifyAuth(req);
    if (!decoded) {
        return NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const projectLink = formData.get('projectLink') as string;
    const imageFile = formData.get('image') as File | null;

    const currentProject = await Project.findById(id);
    if (!currentProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    let imageUrl = currentProject.imageUrl;

    // If new image is provided, upload it to Cloudinary using streaming Buffer
    if (imageFile && imageFile.size > 0) {
      // Check file size (10MB Limit)
      if (imageFile.size > MAX_FILE_SIZE) {
          return NextResponse.json({ 
            success: false, 
            error: 'File too large. Maximum allowed size is 10MB.' 
          }, { status: 400 });
      }

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await uploadImage(buffer);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title || currentProject.title,
        description: description || currentProject.description,
        projectLink: projectLink || currentProject.projectLink,
        imageUrl,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error: any) {
    console.error('Project PUT error:', error);
    return NextResponse.json({ 
        success: false, 
        error: error.message || 'Server error',
        details: error.stack 
    }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: ParamsProps) {
  try {
    // Authenticate
    const decoded = await verifyAuth(req);
    if (!decoded) {
        return NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Project deleted' }, { status: 200 });
  } catch (error: any) {
      console.error('DELETE /api/projects/[id] ERROR:', error);
    return NextResponse.json({ 
        success: false, 
        error: 'Failed to delete project',
        details: error.message 
    }, { status: 500 });
  }
}
