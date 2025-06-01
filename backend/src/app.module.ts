import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsController } from './products/products.controller';
import { ProductFoldersController } from './products/product-folders.controller';
import { ProductTypesController } from './products/product-types.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, ProductFoldersController, ProductTypesController],
  providers: [],
})
export class AppModule {}
