import { ProductRelationsService } from "./../services/product-relations.service";
import { Category } from "../../category/entities/category.entity";
import { ResolveField, Parent, Resolver } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";

@Resolver(() => Product)
export class ProductRelationsResolver {
  public constructor(private readonly productRelationsService: ProductRelationsService) {}

  /**
   * Method that searches for entities based on the parent
   *
   * @param parent defines an object that represents the parent of the
   * current sent query
   * @returns an object that represents the found entity
   */
  @ResolveField(() => Category, {
    name: "categorys",
  })
  public async getOneCategory(
    @Parent()
    parent: Product,
  ): Promise<Category> {
    return await this.productRelationsService.getCategory(parent.categoryId);
  }
}
