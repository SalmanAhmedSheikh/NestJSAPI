import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
//import { AuthService } from 'dist/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) {

    }



@Post('/signup')
signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void>{

//console.log('authCredentialDto',authCredentialDto);

return this.authService.signUp(authCredentialDto)
}

}
