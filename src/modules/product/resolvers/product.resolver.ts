import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";
import { CreateProductInput } from "../dto/create-product.input";
import { UpdateProductInput } from "../dto/update-product.input";

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(returns => Product, { name: "createProduct" })
  async createProduct(@Args("input", { type: () => CreateProductInput }) createProductInput: CreateProductInput): Promise<Product> {
    return await this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: "product" })
  async getAll() {
    return await this.productService.getAll();
  }

  @Query(() => Product, { name: "products" })
  async getOne(@Args("id", { nullable: false }) id: number) {
    return await this.productService.getOne(id);
  }

  @Mutation(() => Product, { name: "updateProduct" })
  async changeOne(
    @Args("input", {
      type: () => UpdateProductInput,
    })
    updateProductInput: UpdateProductInput,
  ) {
    return await this.productService.changeOne(updateProductInput);
  }

  @Mutation(() => Product, { name: "deleteProduct" })
  async removeOne(@Args("id", { nullable: false }) id: number) {
    return await this.productService.removeOne(id);
  }
}
