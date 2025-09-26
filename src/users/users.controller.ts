import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  // ✅ Chỉ cho phép admin hoặc chính chủ xoá tài khoản
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const currentUser = req.user;

    // nếu là admin thì xoá ok
    if (currentUser.role === UserRole.ADMIN) {
      return this.usersService.deleteUser(id);
    }

    // nếu chính user tự xoá account
    if (currentUser.userId === id) {
      return this.usersService.deleteUser(id);
    }

    throw new ForbiddenException('You do not have permission to delete this user');
  }
}
