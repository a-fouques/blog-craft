import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./create-blog.dto";

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBlogDto, @Req() req: any) {
    return this.blogService.create(dto.title, dto.description, req.user);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.blogService.delete(id, req.user.userId);
  }
}
