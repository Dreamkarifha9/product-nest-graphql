import { Module } from "@nestjs/common";
import { CategoryService } from "./services/category.service";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
