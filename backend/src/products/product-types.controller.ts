import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductType } from '@prisma/client';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(): Promise<ProductType[]> {
    return this.prisma.productType.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductType> {
    return this.prisma.productType.findUnique({
      where: { id: Number(id) },
    });
  }

  @Post()
  async create(@Body() data: { name: string }): Promise<ProductType> {
    return this.prisma.productType.create({
      data,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { name?: string },
  ): Promise<ProductType> {
    return this.prisma.productType.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductType> {
    return this.prisma.productType.delete({
      where: { id: Number(id) },
    });
  }
}