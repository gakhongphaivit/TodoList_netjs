import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(dto: CreateTodoDto) {
    const created = new this.todoModel({ ...dto });
    return created.save();
  }

  async findAll(query: QueryTodoDto) {
    const { search, limit, offset } = query;
    const filter = search
      ? { $or: [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }] }
      : {};

    const [items, total] = await Promise.all([
      this.todoModel.find(filter).skip(offset).limit(limit).sort({ createdAt: -1 }).exec(),
      this.todoModel.countDocuments(filter),
    ]);

    return {
      statusCode: 200,
      data: {
        items,
        meta: {
          limit,
          offset,
          total,
          totalPages: limit > 0 ? Math.ceil(total / limit) : null,
        },
      },
    };
  }

  async findOne(id: string) {
    const item = await this.todoModel.findById(id).exec();
    if (!item) throw new NotFoundException('Todo not found');
    return item;
  }

  async update(id: string, dto: UpdateTodoDto) {
    const updated = await this.todoModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Todo not found');
    return updated;
  }

  async updateStatus(id: string, status: string) {
    const updated = await this.todoModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    if (!updated) throw new NotFoundException('Todo not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Todo not found');
    return deleted;
  }
}
