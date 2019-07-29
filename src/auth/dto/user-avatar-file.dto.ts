import { IsString } from 'class-validator';

export class UserAvatarFilePath{

@IsString()
imagePath:string;


}