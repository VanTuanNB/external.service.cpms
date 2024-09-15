import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICourseEntity {
    id: string;
    title: string;
    duration: string;
    quantity: number;
    requirements: string[];
    description?: string;
    faq?: string[];
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
    duration: string;

    @IsArray()
    @IsNotEmpty()
    requirements: string[];

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsArray()
    @IsOptional()
    faq?: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    createdAt?: string;

    @IsString()
    @IsNotEmpty()
    updatedAt?: string;

    constructor(params: ICourseEntity) {
        this.id = params.id;
        this.title = params.title;
        this.duration = params.duration;
        this.quantity = params.quantity;
        this.requirements = params.requirements;
        this.faq = params.faq;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
