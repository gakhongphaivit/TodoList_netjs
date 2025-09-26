import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Todo } from '../../todos/schemas/todo.schema';


export type UserDocument = User & Document;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // mỗi user có danh sách todo riêng
  @Prop({ type: [{ title: String, completed: Boolean }], default: [] })
  todos: { title: string; completed: boolean }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
