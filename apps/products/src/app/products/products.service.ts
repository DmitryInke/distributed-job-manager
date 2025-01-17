import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';
import * as schema from './schema';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly categoriesService: CategoriesService
  ) {}

  async createProduct(
    product: Omit<typeof schema.products.$inferSelect, 'id'>
  ) {
    const category = await this.categoriesService.getCategoryByName(
      product.category
    );

    const adjustedPrice = category
      ? product.price + category.charge
      : product.price;

    const existingProduct = await this.database
      .select()
      .from(schema.products)
      .where(
        and(
          eq(schema.products.name, product.name),
          eq(schema.products.category, product.category),
          eq(schema.products.stock, product.stock),
          eq(schema.products.rating, product.rating),
          eq(schema.products.description, product.description)
        )
      )
      .limit(1);

    if (existingProduct.length > 0) {
      await this.database
        .update(schema.products)
        .set({ price: adjustedPrice })
        .where(eq(schema.products.id, existingProduct[0].id));
    } else {
      await this.database.insert(schema.products).values({
        ...product,
        price: adjustedPrice,
      });
    }
  }
}
