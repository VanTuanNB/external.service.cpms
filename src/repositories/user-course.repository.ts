import { EnumUserRole } from '@/core/constants/common.constant';
import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';

import type { IUserCourseEntity } from '@/database/entities/user-course.entity';
import userCourseSchema from '@/database/schemas/user-course.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class UserCourseRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<IUserCourseEntity[]> {
        return await userCourseSchema.find();
    }

    public async getById(id: string): Promise<IUserCourseEntity | null> {
        return await userCourseSchema.findById(id);
    }

    public async getMetadataQuery(
        options: TypeOptionUpdateRecord<IUserCourseEntity>,
    ): Promise<IUserCourseEntity | null> {
        return await userCourseSchema.findOne(options.updateCondition, options.updateQuery);
    }

    public async getMetadataManyRecordQuery(
        options: TypeOptionUpdateRecord<IUserCourseEntity>,
    ): Promise<IUserCourseEntity[]> {
        return await userCourseSchema.find(options.updateCondition, options.updateQuery);
    }

    public async getRoleRecord(role: number): Promise<IUserCourseEntity | null> {
        return (await userCourseSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<IUserCourseEntity | null> {
        return (await userCourseSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(courses: string[]) {
        return await userCourseSchema.find({ _id: { $in: courses } });
    }

    public async create(payload: IUserCourseEntity): Promise<IUserCourseEntity | null> {
        return await userCourseSchema.create({ _id: payload.id, ...payload });
    }

    public async insertMultiple(payload: IUserCourseEntity[]): Promise<IUserCourseEntity[] | null> {
        return await userCourseSchema.insertMany(this.formatterArrayIds(payload));
    }

    public async update(payload: IUserCourseEntity): Promise<IUserCourseEntity | null> {
        return await userCourseSchema.findByIdAndUpdate({ _id: payload.id }, payload, {
            new: true,
            upsert: true,
        });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<IUserCourseEntity>): Promise<IUserCourseEntity | null> {
        return await userCourseSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateManyRecord(
        options: TypeOptionUpdateRecord<IUserCourseEntity>,
    ): Promise<UpdateQuery<IUserCourseEntity>> {
        return await userCourseSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<IUserCourseEntity | null> {
        return await userCourseSchema.findOneAndDelete({ _id: id });
    }

    public async permanentlyDeleteMultiple(ids: string[]): Promise<DeleteResult | null> {
        return await userCourseSchema.deleteMany({ _id: ids });
    }
}
