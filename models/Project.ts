import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL (Cloudinary) is required'],
  },
  projectLink: {
    type: String,
    required: [true, 'Project link is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if model already exists before defining it
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
