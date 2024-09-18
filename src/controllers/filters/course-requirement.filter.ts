import type { ICourseRequirementEntity } from '@/database/entities/course-requirement.entity';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetInfoCourseRequirementFilterModel implements Partial<ICourseRequirementEntity> {
    @IsString()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<ICourseRequirementEntity>) {
        this.id = payload.id;
    }
}

// region create payload
export type IPayloadCreateCourseRequirement = Omit<
    ICourseRequirementEntity,
    'id' | 'course' | 'createdAt' | 'updatedAt'
> & {
    courseId: string;
};

export class CreateCourseRequirementFilterModel implements Partial<IPayloadCreateCourseRequirement> {
    @IsUUID()
    @IsNotEmpty()
    courseId?: string;

    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    constructor(payload: Partial<IPayloadCreateCourseRequirement>) {
        this.title = payload.title;
        this.code = payload.code;
        this.description = payload.description;
        this.courseId = payload.courseId;
    }
}

export type IPayloadUpdateCourseRequirement = Omit<ICourseRequirementEntity, 'course' | 'createdAt' | 'updatedAt'> & {
    courseId: string;
};

export class UpdateCourseRequirementFilterModel implements Partial<IPayloadUpdateCourseRequirement> {
    @IsUUID()
    @IsNotEmpty()
    courseId?: string;

    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    constructor(payload: Partial<IPayloadUpdateCourseRequirement>) {
        this.title = payload.title;
        this.code = payload.code;
        this.description = payload.description;
        this.courseId = payload.courseId;
    }
}
