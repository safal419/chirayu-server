import { Document } from 'mongoose';
export type ResultDocument = Result & Document;
export declare class Result {
    batch: string;
    year: string;
    totalStudents: number;
    successRate: number;
    toppers: {
        name: string;
        grade: string;
        gpa: string;
        photo: string;
        school: string;
    }[];
}
export declare const ResultSchema: import("mongoose").Schema<Result, import("mongoose").Model<Result, any, any, any, Document<unknown, any, Result, any, {}> & Result & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Result, Document<unknown, {}, import("mongoose").FlatRecord<Result>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Result> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
