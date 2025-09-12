export declare class FilesController {
    upload(files: Express.Multer.File[]): Promise<{
        urls: any[];
        publicIds: any[];
    }>;
}
