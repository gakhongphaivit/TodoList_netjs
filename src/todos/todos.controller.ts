import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() dto: CreateTodoDto) {
    const item = await this.todosService.create(dto);
    return { statusCode: 201, data: { item } };
  }

  @Get()
  async findAll(@Query() query: QueryTodoDto) {
    return this.todosService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.todosService.findOne(id);
    return { statusCode: 200, data: { item } };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const item = await this.todosService.update(id, dto);
    return { statusCode: 200, data: { item } };
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const item = await this.todosService.updateStatus(id, status);
    return { statusCode: 200, data: { item } };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const item = await this.todosService.remove(id);
    return { statusCode: 200, data: { item } };
  }
}
