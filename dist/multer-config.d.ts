import { Request, Response, NextFunction } from 'express';
export declare function configureCloudinary(): void;
export declare const multerStorage: import("multer").StorageEngine;
export declare const multerOptions: {
    storage: import("multer").StorageEngine;
    limits: {
        fileSize: number;
    };
};
export declare function uploadBufferToCloudinary(buffer: Buffer, folder?: string): Promise<any>;
export declare const uploadToCloudinaryMiddleware: (field?: string) => (req: Request & {
    file?: Express.Multer.File;
}, res: Response, next: NextFunction) => Promise<void>;
