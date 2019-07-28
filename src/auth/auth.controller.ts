import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './dto/get-user.decorator';
import { User } from './user.entity';
//import { AuthService } from 'dist/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }



    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {

        //console.log('authCredentialDto',authCredentialDto);

        return this.authService.signUp(authCredentialDto)
    }


    @Post('/signIn')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
console.log('authCredentialDto',authCredentialDto);
        return this.authService.signIn(authCredentialDto);
    }




    @Post('/getUser')
    @UseGuards(AuthGuard())
    GetUser(@GetUser() user:User)
    {
     console.log('user',user);   
    // return user;
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
