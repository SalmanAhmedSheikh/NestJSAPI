import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/GetHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/GetHelloWorld')
  @UseGuards(AuthGuard())
  getHello2(): string {
    return this.appService.getHello();
  }
}
