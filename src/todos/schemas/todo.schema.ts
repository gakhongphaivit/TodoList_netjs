import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ default: 'pending', enum: ['pending', 'in-progress', 'done'] })
  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

// Chỉnh lại cách format JSON khi trả về
TodoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_: any, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
