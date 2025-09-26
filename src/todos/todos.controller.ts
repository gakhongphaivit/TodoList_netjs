import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  private getUserId(req: Request): string {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return (req.user as any).sub;
  }

  @Post()
  async create(@Body() dto: CreateTodoDto, @Req() req: Request) {
    const userId = this.getUserId(req);
    const item = await this.todosService.create(dto, userId);
    return { statusCode: 201, data: { item } };
  }

  @Get()
  async findAll(@Query() query: QueryTodoDto, @Req() req: Request) {
    const userId = this.getUserId(req);
    return this.todosService.findAll(query, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = this.getUserId(req);
    const item = await this.todosService.findOne(id, userId);
    return { statusCode: 200, data: { item } };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @Req() req: Request) {
    const userId = this.getUserId(req);
    const item = await this.todosService.update(id, dto, userId);
    return { statusCode: 200, data: { item } };
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string, @Req() req: Request) {
    const userId = this.getUserId(req);
    const item = await this.todosService.updateStatus(id, status, userId);
    return { statusCode: 200, data: { item } };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = this.getUserId(req);
    const item = await this.todosService.remove(id, userId);
    return { statusCode: 200, data: { item } };
  }
}
