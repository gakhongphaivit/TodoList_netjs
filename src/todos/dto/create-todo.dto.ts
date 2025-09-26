import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsIn(['pending', 'in-progress', 'done'])
  status: string = 'pending';
}
