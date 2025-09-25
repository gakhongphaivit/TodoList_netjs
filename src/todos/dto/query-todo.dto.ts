import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class QueryTodoDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 10;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset: number = 0;
}
