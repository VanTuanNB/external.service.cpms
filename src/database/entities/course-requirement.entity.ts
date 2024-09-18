import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICourseRequirementEntity {
    id: string;
    title: string;
    code: string;
    course: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class CourseRequirementModel implements ICourseRequirementEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsUUID()
    @IsNotEmpty()
    course: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: ICourseRequirementEntity) {
        this.id = params.id;
        this.title = params.title;
        this.course = params.course;
        this.code = params.code;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
