import type { IFacultyEntity } from '@/database/entities/faculty.entity';
import type { ISchoolEntity } from '@/database/entities/school.entity';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetInfoFacultyFilterModel implements Partial<ISchoolEntity> {
    @IsString()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<ISchoolEntity>) {
        this.id = payload.id;
    }
}

// region create
export type IPayloadCreateFaculty = Omit<IFacultyEntity, 'createdAt' | 'updatedAt' | 'curriculum' | 'courses'> & {
    curriculumId: string;
    courseIds: string[];
};

export class CreateFacultyFilterModel implements Partial<IPayloadCreateFaculty> {
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

    @IsArray()
    @IsNotEmpty()
    courseIds?: string[];

    @IsUUID()
    @IsNotEmpty()
    curriculumId?: string;

    constructor(payload: Partial<IPayloadCreateFaculty>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
        this.curriculumId = payload.curriculumId;
        this.courseIds = payload.courseIds;
    }
}


// region update

export type IPayloadUpdateFaculty = Omit<IFacultyEntity, 'courses' | 'curriculum' | 'createdAt' | 'updatedAt'> & {
    courseIds: string[];
    curriculumId: string;
};

export class UpdateFacultyFilterModel implements Partial<IPayloadUpdateFaculty> {
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

    @IsArray()
    @IsNotEmpty()
    courseIds?: string[];

    @IsString()
    @IsNotEmpty()
    curriculumId?: string;

    constructor(payload: Partial<IPayloadUpdateFaculty>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
        this.courseIds = payload.courseIds;
        this.curriculumId = payload.curriculumId;
    }
}