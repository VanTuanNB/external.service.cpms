import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface IFaQEntity {
    id: string;
    question: string;
    answer: string;
    courseId: string;
    options?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export class FaQModel implements IFaQEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    question: string;

    @IsString()
    @IsNotEmpty()
    answer: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsString()
    @IsOptional()
    options?: string[];

    @IsString()
    @IsNotEmpty()
    createdAt?: string;

    @IsString()
    @IsNotEmpty()
    updatedAt?: string;

    constructor(params: IFaQEntity) {
        this.id = params.id;
        this.question = params.question;
        this.answer = params.answer;
        this.courseId = params.courseId;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
