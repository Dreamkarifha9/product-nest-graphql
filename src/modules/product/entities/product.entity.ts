import { Category } from "../../category/entities/category.entity";
import { FilterableField } from "@nestjs-query/query-graphql";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ type: "nvarchar", nullable: false, length: 100 })
  @FilterableField({ nullable: true })
  name: string;

  @Column({ type: "int" })
  @FilterableField({ nullable: true })
  price!: number;

  @Column({ type: "int" })
  @FilterableField({ nullable: true })
  categoryId: number;

  //#region Relations
  @ManyToOne(() => Category, category => category.products)
  categorys!: Category;
  //#endregion
}
