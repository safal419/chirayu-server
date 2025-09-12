"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinaryMiddleware = exports.multerOptions = exports.multerStorage = void 0;
exports.configureCloudinary = configureCloudinary;
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
const multer_1 = require("multer");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
function configureCloudinary() {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
}
exports.multerStorage = (0, multer_1.memoryStorage)();
exports.multerOptions = {
    storage: exports.multerStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
};
function uploadBufferToCloudinary(buffer, folder = 'default') {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}
const uploadToCloudinaryMiddleware = (field = 'file') => {
    return async (req, res, next) => {
        try {
            const file = req.file;
            if (!file || !file.buffer)
                return next();
            const folder = (req.body.folderId || req.headers['folderid'] || 'default').toString();
            const result = await uploadBufferToCloudinary(file.buffer, folder);
            req.file.cloudinaryUrl = result.secure_url;
            req.file.publicId = result.public_id;
            req.file.raw = result;
            next();
        }
        catch (err) {
            console.error('Cloudinary upload error', err);
            next(err);
        }
    };
};
exports.uploadToCloudinaryMiddleware = uploadToCloudinaryMiddleware;
//# sourceMappingURL=multer-config.js.map