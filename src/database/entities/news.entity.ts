import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface INewsEntity {
    id: string;
    title: string;
    contents: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class NewsModel implements INewsEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    contents: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: INewsEntity) {
        this.id = params.id;
        this.contents = params.contents;
        this.title = params.title;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
