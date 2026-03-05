import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { CurrentUserMiddleware } from './users/middlewares/current-user.middleware';

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys : ['mysecretkey']
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))

  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector))
  // )
  // app.use(
  //   new CurrentUserMiddleware(app.get())
  // )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
