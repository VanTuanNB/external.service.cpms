import { EnumUserRole } from '@/core/constants/common.constant';
import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ICourseEntity } from '@/database/entities/course.entity';
import courseSchema from '@/database/schemas/course.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class CourseRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<ICourseEntity[]> {
        return await courseSchema.find();
    }

    public async getById(id: string): Promise<ICourseEntity | null> {
        return await courseSchema.findById(id);
    }

    public async getByCode(code: string): Promise<ICourseEntity | null> {
        return await courseSchema.findOne({ code });
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
