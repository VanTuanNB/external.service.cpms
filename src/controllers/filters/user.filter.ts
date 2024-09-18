import type { ICourseRegisteringEntity } from '@/database/entities/course-register.entity';
import type { IUserEntity } from '@/database/entities/user.entity';
import { IsArray, IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class GetInfoUserFilterModel implements Partial<IUserEntity> {
    @IsUUID()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<IUserEntity>) {
        this.id = payload.id;
    }
}

export type IPayloadUpdateUser = Omit<
    IUserEntity,
    'courses' | 'roles' | 'coursesRegistering' | 'createdAt' | 'refreshToken' | 'updatedAt'
> & {};

export class CourseRegisterFilterModel implements Partial<IPayloadUpdateUser> {
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
    @MinLength(8)
    @IsNotEmpty()
    password?: string;

    constructor(payload: Partial<IPayloadUpdateUser>) {
        this.name = payload.name;
        this.email = payload.email;
        this.phone = payload.phone;
        this.birthday = payload.birthday;
        this.address = payload.address;
        this.password = payload.password;
    }
}

// region register course user
export type IPayloadUserRegisterCourse = Omit<
    ICourseRegisteringEntity,
    'user' | 'id' | 'course' | 'createdAt' | 'updatedAt'
> & {
    courseIds: string[];
    userId: string;
};
export class UserCourseRegisterFilterModel implements Partial<IPayloadUserRegisterCourse> {
    @IsArray()
    @IsNotEmpty()
    courseIds?: string[];

    constructor(payload: Partial<IPayloadUserRegisterCourse>) {
        this.courseIds = payload.courseIds;
    }
}

export class UserAcceptCourseRegisterFilterModel implements Partial<IPayloadUserRegisterCourse> {
    @IsUUID()
    @IsNotEmpty()
    userId?: string;

    constructor(payload: Partial<IPayloadUserRegisterCourse>) {
        this.userId = payload.userId;
    }
}
