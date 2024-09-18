import type { IUserEntity } from '@/database/entities/user.entity';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class GetInfoUserFilterModel implements Partial<IUserEntity> {
    @IsUUID()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<IUserEntity>) {
        this.id = payload.id;
    }
}

export type IPayloadCreateUser = Omit<
    IUserEntity,
    'courses' | 'roles' | 'coursesRegistering' | 'createdAt' | 'refreshToken' | 'updatedAt'
> & {
    courseIds: string[];
    courseRegisteringIds?: string[];
};

export class CreateUserFilterModel implements Partial<IPayloadCreateUser> {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    birthday?: string;

    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsString()
    @Min(8)
    @IsNotEmpty()
    password?: string;

    @IsArray()
    @IsOptional()
    courseIds?: string[] | undefined;

    @IsArray()
    @IsOptional()
    courseRegisteringIds?: string[] | undefined;

    constructor(payload: Partial<IPayloadCreateUser>) {
        this.name = payload.name;
        this.email = payload.email;
        this.phone = payload.phone;
        this.birthday = payload.birthday;
        this.address = payload.address;
        this.password = payload.password;
        this.courseIds = payload.courseIds;
        this.courseRegisteringIds = payload.courseRegisteringIds;
    }
}
