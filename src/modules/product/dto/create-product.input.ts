import { InputType, Int, Field } from "@nestjs/graphql";
import { IsAlpha, IsDefined, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateProductInput {
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
