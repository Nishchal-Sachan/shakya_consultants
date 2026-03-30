import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads an image to Cloudinary using a Buffer or string.
 * Using stream for Buffers is more reliable for large files in Serverless/API environments.
 * @param {Buffer | string} file - The file to upload.
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
export const uploadImage = async (file: Buffer | string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided for upload'));
    }

    const uploadOptions = {
      folder: 'shakya_foundations',
      resource_type: 'auto' as const,
    };

    // If it's a string (e.g., local path or remote URL) but NOT a data URI/Base64
    if (typeof file === 'string' && !file.startsWith('data:') && !file.includes(';base64,')) {
      cloudinary.uploader.upload(file, uploadOptions)
        .then((result: UploadApiResponse) => resolve(result.secure_url))
        .catch((error: UploadApiErrorResponse) => {
          console.error('Cloudinary Upload Error (String):', error);
          reject(error);
        });
      return;
    }

    // For Buffers or Base64 strings, use the stream approach for better reliability
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('Cloudinary Upload Stream Error:', error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Cloudinary upload failed: No result returned'));
        }
        resolve(result.secure_url);
      }
    );

    try {
      if (Buffer.isBuffer(file)) {
        uploadStream.end(file);
      } else if (typeof file === 'string' && (file.startsWith('data:') || file.includes(';base64,'))) {
        // Extract base64 part and convert to buffer
        const base64Data = file.includes(';base64,') 
          ? file.split(';base64,')[1] 
          : file;
        uploadStream.end(Buffer.from(base64Data, 'base64'));
      } else {
        // Fallback for cases where it's a regular string but we got here
        uploadStream.end(Buffer.from(file as string));
      }
    } catch (streamError) {
      console.error('Error writing to Cloudinary stream:', streamError);
      reject(streamError);
    }
  });
};

export default cloudinary;
