import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message (testimonial) is required'],
    trim: true,
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5,
  },
  imageUrl: {
    type: String,
    trim: true,
    // Store Cloudinary URL for the person's profile image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Avoid "Cannot overwrite model once compiled" error in Next.js development
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
