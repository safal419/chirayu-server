import { Schema, Document } from 'mongoose';
export interface File extends Document {
    name: string;
    path: string;
}
export declare const FileSchema: Schema<File, import("mongoose").Model<File, any, any, any, Document<unknown, any, File, any, {}> & File & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File, Document<unknown, {}, import("mongoose").FlatRecord<File>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<File> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
