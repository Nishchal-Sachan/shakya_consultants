import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  logoUrl: {
    type: String,
    required: [true, 'Client logo URL (Cloudinary) is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Avoid "Cannot overwrite model once compiled" error in Next.js
const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

export default Client;
