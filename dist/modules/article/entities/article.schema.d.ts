import { Document } from 'mongoose';
export type ArticleDocument = Article & Document;
export declare class Article {
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    status: string;
    publishDate: Date;
    image: string;
    tags: string[];
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, Document<unknown, any, Article, any, {}> & Article & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, Document<unknown, {}, import("mongoose").FlatRecord<Article>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
