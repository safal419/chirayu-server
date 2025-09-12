import { Document } from 'mongoose';
export type AlumniDocument = Alumni & Document;
export declare class Alumni {
    name: string;
    graduationYear: number;
    currentPosition: string;
    company: string;
    location: string;
    email: string;
    phone: string;
    achievements: string;
    image: string;
    linkedIn: string;
    testimonial: string;
}
export declare const AlumniSchema: import("mongoose").Schema<Alumni, import("mongoose").Model<Alumni, any, any, any, Document<unknown, any, Alumni, any, {}> & Alumni & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Alumni, Document<unknown, {}, import("mongoose").FlatRecord<Alumni>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Alumni> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
