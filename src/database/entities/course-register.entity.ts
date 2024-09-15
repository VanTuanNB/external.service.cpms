import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICourseRegisteringEntity {
    id: string;
    user: string;
    course: string;
    createdAt?: string;
    updatedAt?: string;
}

export class CoursesRegistering implements ICourseRegisteringEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    user: string;

    @IsUUID()
    @IsNotEmpty()
    course: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: ICourseRegisteringEntity) {
        this.id = params.id;
        this.user = params.user;
        this.course = params.course;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
