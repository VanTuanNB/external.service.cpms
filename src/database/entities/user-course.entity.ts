import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface IUserCourseEntity {
    id: string;
    user: string;
    status: number;
    course: string;
    createdAt?: string;
    updatedAt?: string;
}

export class UserCourseModel implements IUserCourseEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    user: string;

    @IsUUID()
    @IsNotEmpty()
    course: string;

    @IsNumber()
    @IsNotEmpty()
    status: number;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IUserCourseEntity) {
        this.id = params.id;
        this.user = params.user;
        this.course = params.course;
        this.status = params.status;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
