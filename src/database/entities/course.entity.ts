import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICourseEntity {
    id: string;
    title: string;
    code: string;
    durationStart: string;
    durationEnd: string;
    quantity: number;
    faculty: string;
    // faq?: string[];
    requirements: string[];
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class CourseModel implements ICourseEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    durationStart: string;

    @IsString()
    @IsNotEmpty()
    durationEnd: string;

    @IsUUID()
    @IsNotEmpty()
    faculty: string;

    @IsArray()
    @IsNotEmpty()
    requirements: string[];

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    // @IsArray()
    // @IsOptional()
    // faq?: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: ICourseEntity) {
        this.id = params.id;
        this.title = params.title;
        this.code = params.code;
        this.durationStart = params.durationStart;
        this.durationEnd = params.durationEnd;
        this.quantity = params.quantity;
        this.faculty = params.faculty;
        this.requirements = params.requirements;
        // this.faq = params.faq;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
