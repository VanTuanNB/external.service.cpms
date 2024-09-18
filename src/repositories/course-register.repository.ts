import { EnumUserRole } from '@/core/constants/common.constant';
import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ICourseRegisteringEntity } from '@/database/entities/course-register.entity';
import courseRegisterSchema from '@/database/schemas/course-register.schema';
import { BaseRepository } from './base-core.repository';

export class CourseRegisterRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<ICourseRegisteringEntity[]> {
        return await courseRegisterSchema.find();
    }

    public async getById(id: string): Promise<ICourseRegisteringEntity | null> {
        return await courseRegisterSchema.findById(id);
    }

    public async getMetadataQuery(
        options: TypeOptionUpdateRecord<ICourseRegisteringEntity>,
    ): Promise<ICourseRegisteringEntity | null> {
        return await courseRegisterSchema.findOne(options.updateCondition, options.updateQuery);
    }

    public async getMetadataManyRecordQuery(
        options: TypeOptionUpdateRecord<ICourseRegisteringEntity>,
    ): Promise<ICourseRegisteringEntity[]> {
        return await courseRegisterSchema.find(options.updateCondition, options.updateQuery);
    }

    public async getRoleRecord(role: number): Promise<ICourseRegisteringEntity | null> {
        return (await courseRegisterSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<ICourseRegisteringEntity | null> {
        return (await courseRegisterSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(courses: string[]) {
        return await courseRegisterSchema.find({ _id: { $in: courses } });
    }

    public async create(payload: ICourseRegisteringEntity): Promise<ICourseRegisteringEntity | null> {
        return await courseRegisterSchema.create({ _id: payload.id, ...payload });
    }

    public async insertMultiple(payload: ICourseRegisteringEntity[]): Promise<ICourseRegisteringEntity[] | null> {
        return await courseRegisterSchema.insertMany(this.formatterArrayIds(payload));
    }

    public async update(payload: ICourseRegisteringEntity): Promise<ICourseRegisteringEntity | null> {
        return await courseRegisterSchema.findByIdAndUpdate({ _id: payload.id }, payload, {
            new: true,
            upsert: true,
        });
    }

    public async updateRecord(
        options: TypeOptionUpdateRecord<ICourseRegisteringEntity>,
    ): Promise<ICourseRegisteringEntity | null> {
        return await courseRegisterSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<ICourseRegisteringEntity | null> {
        return await courseRegisterSchema.findOneAndDelete({ _id: id });
    }

    public async permanentlyDeleteMultiple(ids: string[]): Promise<DeleteResult | null> {
        return await courseRegisterSchema.deleteMany({ _id: ids });
    }
}
