import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICurriculumEntity {
    id: string;
    title: string;
    description: string;
    durationStart: string;
    durationEnd: string;
    code: string;
    faculties: string[];
    createdAt?: string;
    updatedAt?: string;
}

export class CurriculumModel implements ICurriculumEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    durationStart: string;

    @IsString()
    @IsNotEmpty()
    durationEnd: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsArray()
    @IsNotEmpty()
    faculties: string[];

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: ICurriculumEntity) {
        this.id = params.id;
        this.title = params.title;
        this.description = params.description;
        this.code = params.code;
        this.durationStart = params.durationStart;
        this.durationEnd = params.durationEnd;
        this.faculties = params.faculties;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
