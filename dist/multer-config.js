"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
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
//# sourceMappingURL=multer-config.js.map