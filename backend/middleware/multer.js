import multer from 'multer';

// Configure multer for memory storage (files will be stored in memory before uploading to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Use this middleware for routes where you handle file uploads
// For example, in your server.js
export default upload;
