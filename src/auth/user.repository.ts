import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import { UserAvatarFilePath } from "./dto/user-avatar-file.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {

        const { username, password } = authCredentialDto;



        const user = new User();
        user.username = username;

        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        //console.log('About to Save');


        try {
            await user.save();

        }
        catch (e) {
            console.log('Error in user. repository', e.code);

            if (e.code === '23505') {
                throw new ConflictException('Username Already Exist');
            }
            else {

                throw new InternalServerErrorException();
            }

        }
    }


    private async hashPassword(password: string, salt: string) {

        return bcrypt.hash(password, salt);
    }


    async validatePassword(authCredentialDto: AuthCredentialDto): Promise<string> {

        console.log('authCredentialDto', authCredentialDto);
        const { username, password } = authCredentialDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {

            return user.username;
        }
        else {

            return null;
        }


    }




    async updateUserImage(userAvatar: UserAvatarFilePath, myuser: any): Promise<User> {

        console.log('In User.Repository');


        const user: User = myuser;

        user.image = userAvatar.imagePath;
        console.log('Image Path', userAvatar.imagePath);

        console.log('Log before save', user);

        try {
            return await user.save();

        }
        catch (e) {
            console.log('Error in user. repository', e.code, e);


            throw new InternalServerErrorException();


        }
    }











}