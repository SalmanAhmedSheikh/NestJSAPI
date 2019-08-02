import { Controller, Post, Body, ValidationPipe, UseGuards, Req, UseInterceptors, Get, Param } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './dto/get-user.decorator';
import { User } from './user.entity';
import { UserAvatarFilePath } from './dto/user-avatar-file.dto';
//import { AuthService } from 'dist/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Res } from '@nestjs/common';
import { userInfo } from 'os';
import { request } from 'http';


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
        console.log('authCredentialDto', authCredentialDto);
        return this.authService.signIn(authCredentialDto);
    }




    @Post('/getUser')
    @UseGuards(AuthGuard())
    GetUser(@GetUser() user: User) {
        console.log('user', user);
        return user;
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }

    //For DB Save
    @Post('/UpdateUserImage')
    @UseGuards(AuthGuard())
    UpdateUserImage(@Body(ValidationPipe) userAvatar: UserAvatarFilePath,
        @GetUser() myuser: User,

    ): Promise<any> {
        console.log('In Controller');
        console.log('image', userAvatar.imagePath);

        return this.authService.updateUserImage(userAvatar, myuser);

    }


    //For Uploading Image on location
    @Post('/upload')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './Avatars',
            filename: (req, file, cb) => {
                console.log('req.user1', req.user);

                var myuser: User;
                myuser = req.user;
                const randomName = myuser.username;
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }



        })
    }))
    uploadFile(@UploadedFile() file) {
        console.log(file);


    }



    //Wont use below
    /*
    
    @Post('GetUserAvatar/:FileName')
    @UseGuards(AuthGuard())
    async serveAvatar(@Param('FileName') fileId, @Res() res): Promise<any> {
      res.sendFile(fileId, { root: './Avatars'});
    }
    */


    @Post('getUserPhoto')
    @UseGuards(AuthGuard())
    getUserPhoto(@GetUser() user: User, @Res() res) {

        res.sendFile(user.username.toString() + ".jpg", { root: './Avatars' });

    }


    // since all pics are save with user name plus jpg so we will pass user name as argument, If there is no pic user will see SOL.jpg as default pic
    @Get('getProfilePic/:username')
    async getProfilePic(@Param('username') username, @Res() res): Promise<any> {
        res.sendFile(username+'.jpg', { root: './Avatars' },(e)=>{
            if(e)
            {
                res.sendFile('SOL.jpg', { root: './Avatars' });
            }
        });
    }






}

