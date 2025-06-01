import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductFolder } from '@prisma/client';

@Controller('product-folders')
export class ProductFoldersController {
    constructor(private readonly prisma: PrismaService) {}

    @Get()
    async findAll() {
        return this.prisma.productFolder.findMany({
            include: {
                children: true,
                products: {
                    include: {
                        productType: true
                    }
                }
            }
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.prisma.productFolder.findUnique({
            where: { id: Number(id) },
            include: {
                children: true,
                products: {
                    include: {
                        productType: true
                    }
                }
            }
        });
    }

    @Post()
    async create(@Body() data: { name: string; parentId?: number }) {
        let path = '';

        if (data.parentId) {
            const parent = await this.prisma.productFolder.findUnique({
                where: { id: data.parentId }
            });
            path = `${parent.path}/${data.name}`;
        } else {
            path = `/${data.name}`;
        }

        return this.prisma.productFolder.create({
            data: {
                name: data.name,
                parentId: data.parentId,
                path: path
            }
        });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: { name?: string; parentId?: number }
    ) {
        let path = undefined;

        if (data.name || data.parentId) {
            const folder = await this.prisma.productFolder.findUnique({
                where: { id: Number(id) }
            });

            if (data.parentId) {
                const parent = await this.prisma.productFolder.findUnique({
                    where: { id: data.parentId }
                });
                path = `${parent.path}/${data.name || folder.name}`;
            } else if (data.name) {
                const pathParts = folder.path.split('/');
                pathParts[pathParts.length - 1] = data.name;
                path = pathParts.join('/');
            }
        }

        return this.prisma.productFolder.update({
            where: { id: Number(id) },
            data: {
                ...data,
                path: path
            }
        });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        // Сначала проверяем, есть ли подпапки или продукты
        const folder = await this.prisma.productFolder.findUnique({
            where: { id: Number(id) },
            include: {
                children: true,
                products: true
            }
        });

        if (folder.children.length > 0 || folder.products.length > 0) {
            throw new Error('Невозможно удалить непустую папку');
        }

        return this.prisma.productFolder.delete({
            where: { id: Number(id) }
        });
    }

    @Get(':id/tree')
    async getTree(@Param('id') id: string) {
        return this.prisma.productFolder.findUnique({
            where: { id: Number(id) },
            include: {
                children: {
                    include: {
                        children: true,
                        products: true
                    }
                },
                products: {
                    include: {
                        productType: true
                    }
                }
            }
        });
    }
}