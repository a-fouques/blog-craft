// src/blog/dto/create-blog.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  title: string;

  @IsString()
  description: string;
}
