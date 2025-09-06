import { Document } from 'mongoose';
export type NoticeDocument = Notice & Document;
export declare class Notice {
    title: string;
    date: Date;
    priority: string;
    content: string;
}
export declare const NoticeSchema: import("mongoose").Schema<Notice, import("mongoose").Model<Notice, any, any, any, Document<unknown, any, Notice, any, {}> & Notice & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notice, Document<unknown, {}, import("mongoose").FlatRecord<Notice>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Notice> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
