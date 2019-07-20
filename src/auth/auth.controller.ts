import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
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

        return this.authService.signIn(authCredentialDto);
    }



    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
