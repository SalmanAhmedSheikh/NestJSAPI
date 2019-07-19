import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {

        const { username, password } = authCredentialDto;



        const user = new User();
        user.username = username;

        user.salt=await  bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);

        //console.log('About to Save');


        try {
            await user.save();

        }
        catch (e) {
             console.log('Error in user. repository',e.code);

            if (e.code === '23505') {
                throw new ConflictException('Username Already Exist');
            }
            else {

                throw new InternalServerErrorException();
            }

        }
    }


    private async hashPassword(password:string,salt:string)
    {

        return bcrypt.hash(password,salt);
    }

}