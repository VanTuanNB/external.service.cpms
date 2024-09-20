import { EnumUserRole } from '@/core/constants/common.constant';
import type { QueryPaging, QueryType, TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';

import type { INewsEntity } from '@/database/entities/news.entity';
import newsSchema from '@/database/schemas/news.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class NewsRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(
        queryData: QueryType,
        queryPaging: QueryPaging,
    ): Promise<{ items: INewsEntity[]; totalItems: number }> {
        const { skip, limit } = queryPaging;
        const items = await newsSchema.find(queryData).skip(skip).limit(limit);
        const totalItems = await newsSchema.countDocuments(queryData);

        return { items, totalItems };
    }

    public async getById(id: string): Promise<INewsEntity | null> {
        return await newsSchema.findById(id);
    }

    public async getMetadataQuery(options: TypeOptionUpdateRecord<INewsEntity>): Promise<INewsEntity | null> {
        return await newsSchema.findOne(options.updateCondition, options.updateQuery);
    }

    public async getMetadataManyRecordQuery(options: TypeOptionUpdateRecord<INewsEntity>): Promise<INewsEntity[]> {
        return await newsSchema.find(options.updateCondition, options.updateQuery);
    }

    public async getRoleRecord(role: number): Promise<INewsEntity | null> {
        return (await newsSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<INewsEntity | null> {
        return (await newsSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(courses: string[]) {
        return await newsSchema.find({ _id: { $in: courses } });
    }

    public async create(payload: INewsEntity): Promise<INewsEntity | null> {
        return await newsSchema.create({ _id: payload.id, ...payload });
    }

    public async insertMultiple(payload: INewsEntity[]): Promise<INewsEntity[] | null> {
        return await newsSchema.insertMany(this.formatterArrayIds(payload));
    }

    public async update(payload: INewsEntity): Promise<INewsEntity | null> {
        return await newsSchema.findByIdAndUpdate({ _id: payload.id }, payload, {
            new: true,
            upsert: true,
        });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<INewsEntity>): Promise<INewsEntity | null> {
        return await newsSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateManyRecord(options: TypeOptionUpdateRecord<INewsEntity>): Promise<UpdateQuery<INewsEntity>> {
        return await newsSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<INewsEntity | null> {
        return await newsSchema.findOneAndDelete({ _id: id });
    }

    public async permanentlyDeleteMultiple(ids: string[]): Promise<DeleteResult | null> {
        return await newsSchema.deleteMany({ _id: ids });
    }
}
