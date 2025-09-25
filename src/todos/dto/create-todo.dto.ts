import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    
    @IsOptional()
    @IsString()
    content?: string;
}
