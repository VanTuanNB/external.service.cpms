import type { ICourseEntity } from '@/database/entities/course.entity';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetInfoCourseFilterModel implements Partial<ICourseEntity> {
    @IsString()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<ICourseEntity>) {
        this.id = payload.id;
    }
}

// region create payload
export type IPayloadCreateCourse = Omit<ICourseEntity, 'faculty' | 'requirements' | 'createdAt' | 'updatedAt'> & {
    facultyId: string;
    requirementIds?: string[];
};

export class CreateCourseFilterModel implements Partial<IPayloadCreateCourse> {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsString()
    @IsNotEmpty()
    durationStart?: string;

    @IsString()
    @IsNotEmpty()
    durationEnd?: string;

    @IsNumber()
    @IsNotEmpty()
    quantity?: number;

    @IsUUID()
    @IsNotEmpty()
    facultyId?: string;

    @IsArray()
    @IsOptional()
    requirementIds?: string[];

    constructor(payload: Partial<IPayloadCreateCourse>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
        this.facultyId = payload.facultyId;
        this.quantity = payload.quantity;
        this.requirementIds = payload.requirementIds;
    }
}

export type IPayloadUpdateCourse = Omit<ICourseEntity, 'faculty' | 'requirements' | 'createdAt' | 'updatedAt'> & {
    facultyId: string;
    requirementIds?: string[];
};

export class UpdateCourseFilterModel implements Partial<IPayloadCreateCourse> {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsString()
    @IsNotEmpty()
    durationStart?: string;

    @IsString()
    @IsNotEmpty()
    durationEnd?: string;

    @IsNumber()
    @IsNotEmpty()
    quantity?: number;

    @IsUUID()
    @IsNotEmpty()
    facultyId?: string;

    @IsArray()
    @IsOptional()
    requirementIds?: string[];

    constructor(payload: Partial<IPayloadCreateCourse>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
        this.facultyId = payload.facultyId;
        this.quantity = payload.quantity;
        this.requirementIds = payload.requirementIds;
    }
}
