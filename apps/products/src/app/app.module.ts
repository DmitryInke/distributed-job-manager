import { LoggerModule } from '@distributed-job-manager/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
