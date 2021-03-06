import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';




@Module({
   imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
         secret: '4get!tSalman',
         signOptions: { expiresIn: 600 }
      }),
      TypeOrmModule.forFeature([UserRepository])],
   controllers: [AuthController],
   providers: [AuthService
      , JwtStrategy],
   exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
