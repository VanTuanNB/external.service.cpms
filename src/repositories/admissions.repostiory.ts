import { EnumUserRole } from '@/core/constants/common.constant';
import type { QueryPaging, QueryType, TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';

import type { IAdmissionsEntity } from '@/database/entities/admissions.entity';
import admissionsSchema from '@/database/schemas/admissions.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class AdmissionsRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(
        queryData: QueryType,
        queryPaging: QueryPaging,
    ): Promise<{ items: IAdmissionsEntity[]; totalItems: number }> {
        const { skip, limit } = queryPaging;
        const items = await admissionsSchema.find(queryData).skip(skip).limit(limit);
        const totalItems = await admissionsSchema.countDocuments(queryData);

        return { items, totalItems };
    }

    public async getById(id: string): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.findById(id);
    }

    public async getByEmail(email: string): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.findOne({ email });
    }

    public async getMetadataQuery(
        options: TypeOptionUpdateRecord<IAdmissionsEntity>,
    ): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.findOne(options.updateCondition, options.updateQuery);
    }

    public async getMetadataManyRecordQuery(
        options: TypeOptionUpdateRecord<IAdmissionsEntity>,
    ): Promise<IAdmissionsEntity[]> {
        return await admissionsSchema.find(options.updateCondition, options.updateQuery);
    }

    public async getRoleRecord(role: number): Promise<IAdmissionsEntity | null> {
        return (await admissionsSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<IAdmissionsEntity | null> {
        return (await admissionsSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(courses: string[]) {
        return await admissionsSchema.find({ _id: { $in: courses } });
    }

    public async create(payload: IAdmissionsEntity): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.create({ _id: payload.id, ...payload });
    }

    public async insertMultiple(payload: IAdmissionsEntity[]): Promise<IAdmissionsEntity[] | null> {
        return await admissionsSchema.insertMany(this.formatterArrayIds(payload));
    }

    public async update(payload: IAdmissionsEntity): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.findByIdAndUpdate({ _id: payload.id }, payload, {
            new: true,
            upsert: true,
        });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<IAdmissionsEntity>): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateManyRecord(
        options: TypeOptionUpdateRecord<IAdmissionsEntity>,
    ): Promise<UpdateQuery<IAdmissionsEntity>> {
        return await admissionsSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<IAdmissionsEntity | null> {
        return await admissionsSchema.findOneAndDelete({ _id: id });
    }

    public async permanentlyDeleteMultiple(ids: string[]): Promise<DeleteResult | null> {
        return await admissionsSchema.deleteMany({ _id: ids });
    }
}
