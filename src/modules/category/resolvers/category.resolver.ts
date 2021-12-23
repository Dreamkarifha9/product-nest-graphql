import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CategoryService } from "../services/category.service";
import { Category } from "../entities/category.entity";
import { CreateCategoryInput } from "../dto/create-category.input";
import { UpdateCategoryInput } from "../dto/update-category.input";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { name: "createCategory" })
  async createCategory(@Args("input") createCategoryInput: CreateCategoryInput) {
    return await this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: "category" })
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Query(() => Category, { name: "categorys" })
  async getOne(@Args("id", { nullable: false }) id: number) {
    return await this.categoryService.getOne(id);
  }

  @Mutation(() => Category, { name: "updateCategory" })
  async changeOne(
    @Args("input", {
      type: () => UpdateCategoryInput,
    })
    updateCategoryInput: UpdateCategoryInput,
  ) {
    return await this.categoryService.changeOne(updateCategoryInput);
  }

  @Mutation(() => Category, { name: "deleteCategory" })
  async removeOne(@Args("id", { nullable: false }) id: number) {
    return await this.categoryService.removeOne(id);
  }
}
