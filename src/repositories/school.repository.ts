import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ISchoolEntity } from '@/database/entities/school.entity';
import schoolSchema from '@/database/schemas/school.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class SchoolRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async checkRecordExists(id: string): Promise<{ _id: string } | null> {
        return await schoolSchema.exists({ _id: id });
    }

    public async getList(): Promise<ISchoolEntity[]> {
        return await schoolSchema.find();
    }

    public async getByCode(code: string): Promise<ISchoolEntity | null> {
        return await schoolSchema.findOne({ code });
    }

    public async getById(id: string): Promise<ISchoolEntity | null> {
        return await schoolSchema.findById(id);
    }

    public async create(payload: ISchoolEntity): Promise<ISchoolEntity | null> {
        return await schoolSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: ISchoolEntity): Promise<ISchoolEntity | null> {
        return await schoolSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<ISchoolEntity>): Promise<ISchoolEntity | null> {
        return await schoolSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateManyRecord(options: TypeOptionUpdateRecord<ISchoolEntity>): Promise<UpdateQuery<ISchoolEntity>> {
        return await schoolSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }
}
