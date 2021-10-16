import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/http.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nest example')
    .setDescription('Some api examples')
    .setVersion('1.0')
    .addTag('examples')
    .build();
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
