import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.setGlobalPrefix('api/v1');
  const PORT = process.env.PORT || 4000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/api/v1`);
  });
}

bootstrap().catch((err) => console.log(err));
