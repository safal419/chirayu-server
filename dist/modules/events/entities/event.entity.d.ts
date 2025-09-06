import { Document } from 'mongoose';
export type EventDocument = Event & Document;
export declare class Event {
    title: string;
    date: Date;
    time: string;
    location: string;
    status: string;
    image: string;
    description: string;
    attendees: number;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event, any, {}> & Event & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Event> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
