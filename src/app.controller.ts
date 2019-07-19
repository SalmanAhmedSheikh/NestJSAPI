import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/GetHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/GetHello2')
  getHello2(): string {
    return this.appService.getHello();
  }
}
