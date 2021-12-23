import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  setupPipes(app);
  app.enableCors({
    credentials: true,
    origin: ["http://localhost:8080", "http://localhost:8081"],
  });
  await app.listen(3000);
}
bootstrap();

//#region Setup

/**
 * Function that set the global pipes to the application
 *
 * @param app stores the application instance
 */
function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
}

//#endregion
