import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from '../utils/appError';
const uploadDir = path.join(__dirname, '../../uploads/thumbnails');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `anime-${uniqueSuffix}${ext}`);
  },
});
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Only image files are allowed', 400) as unknown as null,
      false
    );
  }
};

export const uploadThumbnail = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, 
});