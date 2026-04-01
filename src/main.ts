import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CurrentUserMiddleware } from './users/middlewares/current-user.middleware';

const cookieSession = require('cookie-session')
import cookieSession from 'cookie-session';
// import { Reflector } from '@nestjs/core';

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
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(process.env.PORT ?? 3000);
  console.log("http://localhost:3000")
}
bootstrap();