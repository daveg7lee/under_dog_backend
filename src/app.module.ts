import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.forRoot({ privateKey: process.env.JWT_SECRET_KEY }),
    ProjectsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(UsersController);
  }
}
