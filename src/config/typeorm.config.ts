import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig:TypeOrmModuleOptions={
type:'postgres',
host:'localhost',
port:5432,
username:'postgres',
password:'m0n1t0r1',
database:'taskmanagement',
entities:[__dirname + '/../**/*.entity{.ts,.js}'],
synchronize:true,

};