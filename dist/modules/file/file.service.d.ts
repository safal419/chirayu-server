import { Model } from 'mongoose';
import { File } from './file.model';
export declare class FileService {
    private fileModel;
    constructor(fileModel: Model<File>);
    uploadFiles(files: Express.Multer.File[]): Promise<string[]>;
}
