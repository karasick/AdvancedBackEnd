import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {apiDocument} from "./docs";
import {SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, apiDocument)
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}
start();
