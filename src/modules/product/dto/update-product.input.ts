import { CreateProductInput } from "./create-product.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { IsDefined, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsOptional()
  @IsInt()
  @Field({ nullable: false })
  id: number;

  @IsDefined({ message: "It is required to send the name" })
  @IsString({ message: "It is required to send a valid string" })
  @Field({ nullable: false })
  name: string;

  @IsDefined({ message: "It is required to send the price" })
  @IsNumber()
  @Field({ nullable: false })
  price: number;

  @IsDefined({ message: "It is required to send the categoryId" })
  @IsNumber()
  @Field({ nullable: false })
  categoryId: number;
}
