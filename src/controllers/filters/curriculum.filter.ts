import type { ICurriculumEntity } from '@/database/entities/curriculum.entity';
import type { ISchoolEntity } from '@/database/entities/school.entity';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetInfoCurriculumFilterModel implements Partial<ISchoolEntity> {
    @IsString()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<ISchoolEntity>) {
        this.id = payload.id;
    }
}

// region get list paging
export interface IPayloadGetListCurriculum {
    page: number;
    limit: number;
    keyword?: string;
    durationStart?: string;
    durationEnd?: string;
}

export class GetPagingCurriculumFilterModel implements Partial<IPayloadGetListCurriculum> {
    @IsString()
    @IsOptional()
    page?: number;

    @IsString()
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    durationStart?: string;

    @IsString()
    @IsOptional()
    durationEnd?: string;

    constructor(payload: Partial<IPayloadGetListCurriculum>) {
        this.page = payload.page;
        this.limit = payload.limit;
        this.keyword = payload.keyword;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
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
