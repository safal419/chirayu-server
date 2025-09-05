import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const folderId = req.body.folderId || req.headers['folderid'] || 'default';
      const folderPath = path.join(__dirname, '..', 'uploads', folderId);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  }),
};