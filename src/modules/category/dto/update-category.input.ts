import { CreateCategoryInput } from "./create-category.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { IsInt, IsOptional } from "class-validator";

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsOptional()
  @IsInt()
  @Field({ nullable: false })
  id: number;
}
