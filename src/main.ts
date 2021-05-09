import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(
      {
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          transformOptions: {
              enableImplicitConversion: true
          }
      })
  )

  const config = new DocumentBuilder()
      .setTitle('Fire App')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'access-token')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
