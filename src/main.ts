import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    secret: "mysecretkey"
  }))
  app.enableCors({
    origin: "http://localhost:5173",   // your Vite dev server
    credentials: true,                 // allow cookies
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  await app.listen(process.env.PORT ?? 3000);
  console.log("http://localhost:3000")
}
bootstrap();