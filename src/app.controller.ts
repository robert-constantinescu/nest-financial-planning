import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { NoAuth } from './auth/no-auth.decorator';
import {AppService} from "./app.service";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {

  constructor(
      private readonly appService: AppService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @NoAuth()
  @Get('hello')
  getHello(): string {
    console.log('hello');
    return this.appService.getHello();
  }
}
