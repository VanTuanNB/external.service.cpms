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

// region get list paging
export interface IPayloadGetListNews {
    page: number;
    limit: number;
    keyword?: string;
    durationStart?: string;
    durationEnd?: string;
}

export class GetPagingNewsFilterModel implements Partial<IPayloadGetListNews> {
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

    constructor(payload: Partial<IPayloadGetListNews>) {
        this.page = payload.page;
        this.limit = payload.limit;
        this.keyword = payload.keyword;
        this.durationStart = payload.durationStart;
        this.durationEnd = payload.durationEnd;
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
