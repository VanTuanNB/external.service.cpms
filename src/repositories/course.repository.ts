import { EnumUserRole } from '@/core/constants/common.constant';
import type { QueryPaging, QueryType, TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ICourseEntity } from '@/database/entities/course.entity';
import courseSchema from '@/database/schemas/course.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class CourseRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(
        queryData: QueryType,
        queryPaging: QueryPaging,
    ): Promise<{ items: ICourseEntity[]; totalItems: number }> {
        const { skip, limit } = queryPaging;
        const items = await courseSchema
            .find(queryData)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'faculty',
                model: 'faculties',
                select: 'title code description durationStart durationEnd createdAt updatedAt',
                transform: (doc) => {
                    const { _id, ...restOfProperties } = doc.toObject();
                    return { id: _id, ...restOfProperties };
                },
            })
            .populate({
                path: 'requirements',
                model: 'course-requirements',
                select: 'title code description createdAt updatedAt',
                transform: (doc) => {
                    const { _id, ...restOfProperties } = doc.toObject();
                    return { id: _id, ...restOfProperties };
                },
            });
        const totalItems = await courseSchema.countDocuments(queryData);

        return { items, totalItems };
    }

    public async getById(id: string): Promise<ICourseEntity | null> {
        return await courseSchema
            .findById(id)
            .populate({
                path: 'faculty',
                model: 'faculties',
                select: 'title code description durationStart durationEnd createdAt updatedAt',
                transform: (doc) => {
                    const { _id, ...restOfProperties } = doc.toObject();
                    return { id: _id, ...restOfProperties };
                },
            })
            .populate({
                path: 'requirements',
                model: 'course-requirements',
                select: 'title code description createdAt updatedAt',
                transform: (doc) => {
                    const { _id, ...restOfProperties } = doc.toObject();
                    return { id: _id, ...restOfProperties };
                },
            });
    }

    public async getByCode(code: string): Promise<ICourseEntity | null> {
        return await courseSchema.findOne({ code });
    }

    public async getMetadataQuery(options: TypeOptionUpdateRecord<ICourseEntity>): Promise<ICourseEntity | null> {
        return await courseSchema.findOne(options.updateCondition, options.updateQuery);
    }

    public async getMetadataManyRecordQuery(options: TypeOptionUpdateRecord<ICourseEntity>): Promise<ICourseEntity[]> {
        return await courseSchema.find(options.updateCondition, options.updateQuery);
    }

    public async getRoleRecord(role: number): Promise<ICourseEntity | null> {
        return (await courseSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<ICourseEntity | null> {
        return (await courseSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(requirementIds: string[]) {
        return await courseSchema.find({ _id: { $in: requirementIds } });
    }

    public async create(payload: ICourseEntity): Promise<ICourseEntity | null> {
        return await courseSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: ICourseEntity): Promise<ICourseEntity | null> {
        return await courseSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<ICourseEntity>): Promise<ICourseEntity | null> {
        return await courseSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateManyRecord(options: TypeOptionUpdateRecord<ICourseEntity>): Promise<UpdateQuery<ICourseEntity>> {
        return await courseSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<ICourseEntity | null> {
        return await courseSchema.findOneAndDelete({ _id: id });
    }

    // public async permanentlyDeleteMultiple(
    //     payload: IPermanentlyDeleteMultipleChannelModel,
    // ): Promise<DeleteResult | null> {
    //     console.log('payload', payload);
    //     return await channelSchema.deleteMany({ serverId: payload.serverId, _id: { $in: payload.channelIds } });
    // }
}
