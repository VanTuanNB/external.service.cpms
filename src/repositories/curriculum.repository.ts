import { EnumUserRole } from '@/core/constants/common.constant';
import type { QueryPaging, QueryType, TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ICurriculumEntity } from '@/database/entities/curriculum.entity';
import curriculumSchema from '@/database/schemas/curriculum.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class CurriculumRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(
        queryData: QueryType,
        queryPaging: QueryPaging,
    ): Promise<{ items: ICurriculumEntity[]; totalItems: number }> {
        const { skip, limit } = queryPaging;
        const items = await curriculumSchema
            .find(queryData)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'faculties',
                model: 'faculties',
                select: 'title code description durationStart durationEnd createdAt updatedAt',
                transform: (doc) => {
                    if (!doc) return null;
                    const { _id, ...restOfProperties } = doc.toObject();
                    return { id: _id, ...restOfProperties };
                },
            });
        const totalItems = await curriculumSchema.countDocuments(queryData);

        return { items, totalItems };
    }

    public async getById(id: string): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.findById(id).populate({
            path: 'faculties',
            model: 'faculties',
            select: 'title code description durationStart durationEnd createdAt updatedAt',
            transform: (doc) => {
                if (!doc) return null;
                const { _id, ...restOfProperties } = doc.toObject();
                return { id: _id, ...restOfProperties };
            },
        });
    }

    public async getByCode(code: string): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.findOne({ code });
    }

    public async getRoleRecord(role: number): Promise<ICurriculumEntity | null> {
        return (await curriculumSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<ICurriculumEntity | null> {
        return (await curriculumSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async create(payload: ICurriculumEntity): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: ICurriculumEntity): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }
    public async updateManyRecord(
        options: TypeOptionUpdateRecord<ICurriculumEntity>,
    ): Promise<UpdateQuery<ICurriculumEntity>> {
        return await curriculumSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<ICurriculumEntity>): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.findOneAndDelete({ _id: id });
    }

    // public async permanentlyDeleteMultiple(
    //     payload: IPermanentlyDeleteMultipleChannelModel,
    // ): Promise<DeleteResult | null> {
    //     console.log('payload', payload);
    //     return await channelSchema.deleteMany({ serverId: payload.serverId, _id: { $in: payload.channelIds } });
    // }
}
