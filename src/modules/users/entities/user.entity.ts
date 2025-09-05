import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {PrimaryGeneratedColumn} from "typeorm"
export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @PrimaryGeneratedColumn()
    _id: Types.ObjectId;
    
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email?: string;

  @Prop({ required: true })
  role?: string;
  
  @Prop()
  phoneNumber?: string; 

    @Prop()
  location?: string; 

  @Prop({ required: true })
  password?: string;

  @Prop({ required: false })
  profilePic?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
