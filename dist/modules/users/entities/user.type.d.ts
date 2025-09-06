import { Document, Types } from 'mongoose';
export interface User extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: string;
    password: string;
    profilePic: string;
    location?: string;
    phoneNumber?: string;
}
