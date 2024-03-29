import {HttpException, Module, ValidationPipe} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";
import {AllExceptionsFilter} from "./common/filters/exception.filter";
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(), IncomeModule, ExpenseModule, CommonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule {}
