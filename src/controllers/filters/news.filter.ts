import type { INewsEntity } from '@/database/entities/news.entity';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetInfoNewsFilterModel implements Partial<INewsEntity> {
    @IsUUID()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<INewsEntity>) {
        this.id = payload.id;
    }
}

export type IPayloadCreateNews = Omit<INewsEntity, 'createdAt' | 'updatedAt'> & {};

export class CreateNewsFilterModel implements Partial<IPayloadCreateNews> {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    contents?: string;

    @IsString()
    @IsOptional()
    description?: string;

    constructor(payload: Partial<IPayloadCreateNews>) {
        this.title = payload.title;
        this.contents = payload.contents;
        this.contents = payload.contents;
    }
}
