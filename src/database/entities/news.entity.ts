import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export interface INewsEntity {
    id: string;
    contents: string;
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
    createdAt?: string;

    @IsString()
    @IsNotEmpty()
    updatedAt?: string;

    constructor(params: INewsEntity) {
        this.id = params.id;
        this.contents = params.contents;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
