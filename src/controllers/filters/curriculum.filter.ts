import type { ICurriculumEntity } from '@/database/entities/curriculum.entity';
import type { ISchoolEntity } from '@/database/entities/school.entity';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetInfoCurriculumFilterModel implements Partial<ISchoolEntity> {
    @IsString()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<ISchoolEntity>) {
        this.id = payload.id;
    }
}

// region create
export type IPayloadCreateCurriculum = Omit<ICurriculumEntity, 'faculties' | 'createdAt' | 'updatedAt'> & {
    facultyIds: string[];
};

export class CreateCurriculumFilterModel implements Partial<IPayloadCreateCurriculum> {
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
    facultyIds?: string[];

    constructor(payload: Partial<IPayloadCreateCurriculum>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
        this.facultyIds = payload.facultyIds;
    }
}

// region update

export type IPayloadUpdateCurriculum = Omit<ICurriculumEntity, 'faculties' | 'createdAt' | 'updatedAt'> & {
    facultyIds: string[];
};

export class UpdateCurriculumFilterModel implements Partial<IPayloadUpdateCurriculum> {
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
    facultyIds?: string[];

    constructor(payload: Partial<IPayloadUpdateCurriculum>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
        this.facultyIds = payload.facultyIds;
    }
}
