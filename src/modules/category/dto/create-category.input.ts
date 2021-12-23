import { InputType, Int, Field } from "@nestjs/graphql";
import { IsAlpha, IsDefined, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateCategoryInput {
  @IsDefined({ message: "It is required to send the name" })
  @IsString({ message: "It is required to send a valid string" })
  @Field()
  name: string;
}
