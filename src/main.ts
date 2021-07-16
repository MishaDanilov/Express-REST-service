import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { uncaughtException, unhandledRejection } from './common/errorHandling';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Trello Service')
    .setDescription('Lets try to create a competitor for Trello!')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);

  process.on('uncaughtException', uncaughtException);

  process.on('unhandledRejection', unhandledRejection);

  await app.listen(process.env.PORT);
}
bootstrap();
