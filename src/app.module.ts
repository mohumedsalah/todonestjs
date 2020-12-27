import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticateMiddleware } from './middleware/authenticate.middleware';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes('todo');
  }
}
