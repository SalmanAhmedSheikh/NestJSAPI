import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Jwtpayload } from './jwt-payload.inteface';
import { User } from 'dist/auth/user.entity';
import { UserAvatarFilePath } from './dto/user-avatar-file.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService:JwtService,
    ) {
    }


async signUp(authCredentialDto:AuthCredentialDto):Promise<void>
{
return this.userRepository.signUp(authCredentialDto);

}

async signIn(authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}>
{
const username=await this.userRepository.validatePassword(authCredentialDto);



if(!username)
{

    throw new UnauthorizedException('Invalid Credentials');
}
const payload:Jwtpayload={username};
const accessToken=await this.jwtService.sign(payload);
//console.log('result of ValidatePassword',result);

return {accessToken};

}

async updateUserImage(userAvatar:UserAvatarFilePath,myuser:User):Promise<User>
{
   

    return this.userRepository.updateUserImage(userAvatar,myuser);


}


}
