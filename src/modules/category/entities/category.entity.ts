import { FilterableField } from "@nestjs-query/query-graphql";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Product } from "../../product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ type: "nvarchar", nullable: false, length: 100 })
  @FilterableField({ nullable: true })
  name: string;

  //#region Relations
  @OneToMany(() => Product, product => product.categorys, { cascade: true })
  products?: Product[];
  //#endregion
}
