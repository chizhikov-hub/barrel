import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsController } from './products/products.controller';
import { CategoriesController } from './products/categories.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, CategoriesController],
  providers: [],
})
export class AppModule {}
