import { Category } from "../../category/entities/category.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CategoryService } from "src/modules/category/services/category.service";

@Injectable()
export class ProductRelationsService {
  public constructor(@InjectRepository(Product) private readonly productsRepository: Repository<Product>, private categoryService: CategoryService) {}

  async getCategory(categoryId: number): Promise<Category> {
    return await this.categoryService.findOne_Relations(categoryId);
  }
}
