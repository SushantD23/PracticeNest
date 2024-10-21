import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { testController } from './testmod/controller/test.controller';
import { testModule } from './testmod/module/test.module';
import { testService } from './testmod/provider/test.service';
import { pipeController } from './pipe/pipe.controller';
import { pipeService } from './pipe/pipe.service';
import { ExceptionController } from './ExceptionFilter/exception.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { crudModule } from './4. Database/1.CRUD/crud.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { userModule } from './5. AuthC&AuthS/User Module/user.module';
import { authModule } from './5. AuthC&AuthS/Auth Module/Auth.module';
import { pracController } from './prac.contoller';
import { authMiddleware } from './5. AuthC&AuthS/Auth Module/auth.middleware';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploadedFile'),
      serveRoot: '/uploadedFile'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'PSQL12@',
      database: 'auth',
      autoLoadModels: true,
      synchronize: true,
    }),
    // testModule,
    // crudModule,
    userModule,
    authModule
  ],
  controllers: [AppController, pracController],
  providers: [AppService],
})


export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('auth/profile')
  }
}
