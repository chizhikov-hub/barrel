import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id: Number(id) },
    });
  }

  @Post()
  async create(@Body() data: { name: string }): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { name?: string },
  ): Promise<Category> {
    return this.prisma.category.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: { id: Number(id) },
    });
  }
}