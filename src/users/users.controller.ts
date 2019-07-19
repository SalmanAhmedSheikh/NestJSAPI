import { Controller, Get, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { create } from 'domain';

@Controller('users')
export class UsersController {

@Get('findAll')
findAll(@Req() request: Request):string{

    return "Hi";
}


@Post('AddUser')
create():string{
return 'will add new User';

}


}
