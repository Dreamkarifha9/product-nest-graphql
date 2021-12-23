import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ProductModule } from "./modules/product/product.module";
import { CategoryModule } from "./modules/category/category.module";
import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import * as winston from "winston";
@Module({
  imports: [
    ProductModule,
    CategoryModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.combine(winston.format.colorize(), winston.format.simple()),
            nestWinstonModuleUtilities.format.nestLike("Server Context", { prettyPrint: true }),
          ),
        }),
      ],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      cors: {
        Credential: true,
        origin: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
