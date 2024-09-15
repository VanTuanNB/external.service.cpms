import type { IUserEntity } from '@/database/entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayloadFilterModel implements Partial<IUserEntity> {
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    birthday?: string;

    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsString()
    @IsNotEmpty()
    password?: string;

    constructor(user: Partial<IUserEntity>) {
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.phone = user.phone;
        this.address = user.address;
        this.birthday = user.birthday;
    }
}

export class LoginPayloadFilterModel implements Partial<IUserEntity> {
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    password?: string;

    constructor(user: Partial<IUserEntity>) {
        this.email = user.email;
        this.password = user.password;
    }
}
