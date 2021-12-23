import { CategoryModule } from "./../category/category.module";
import { ProductRelationsService } from "./services/product-relations.service";
import { ProductRelationsResolver } from "./resolvers/product-relations.resolver";
import { forwardRef, Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { ProductResolver } from "./resolvers/product.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => CategoryModule)],
  providers: [ProductResolver, ProductService, ProductRelationsResolver, ProductRelationsService],
})
export class ProductModule {}
