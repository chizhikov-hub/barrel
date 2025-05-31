import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id: Number(id) },
    });
  }

  @Post()
  async create(@Body() data: { name: string; favorite?: boolean }): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { name?: string; favorite?: boolean },
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}