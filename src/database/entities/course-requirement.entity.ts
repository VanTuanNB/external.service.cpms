import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICourseRequirementEntity {
    id: string;
    title: string;
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
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    createdAt?: string;

    @IsString()
    @IsNotEmpty()
    updatedAt?: string;

    constructor(params: ICourseRequirementEntity) {
        this.id = params.id;
        this.title = params.title;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
