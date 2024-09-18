import { EnumUserRole } from '@/core/constants/common.constant';
import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ICourseRequirementEntity } from '@/database/entities/course-requirement.entity';
import courseRequirementSchema from '@/database/schemas/course-requirement.schema';
import { BaseRepository } from './base-core.repository';

export class CourseRequirementRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<ICourseRequirementEntity[]> {
        return await courseRequirementSchema.find();
    }

    public async getById(id: string): Promise<ICourseRequirementEntity | null> {
        return await courseRequirementSchema.findById(id);
    }

    public async getByCode(code: string): Promise<ICourseRequirementEntity | null> {
        return await courseRequirementSchema.findOne({ code });
    }

    public async getRoleRecord(role: number): Promise<ICourseRequirementEntity | null> {
        return (await courseRequirementSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<ICourseRequirementEntity | null> {
        return (await courseRequirementSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(courses: string[]) {
        return await courseRequirementSchema.find({ _id: { $in: courses } });
    }

    public async create(payload: ICourseRequirementEntity): Promise<ICourseRequirementEntity | null> {
        return await courseRequirementSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: ICourseRequirementEntity): Promise<ICourseRequirementEntity | null> {
        return await courseRequirementSchema.findByIdAndUpdate({ _id: payload.id }, payload, {
            new: true,
            upsert: true,
        });
    }

    public async updateRecord(
        options: TypeOptionUpdateRecord<ICourseRequirementEntity>,
    ): Promise<ICourseRequirementEntity | null> {
        return await courseRequirementSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<ICourseRequirementEntity | null> {
        return await courseRequirementSchema.findOneAndDelete({ _id: id });
    }

    // public async permanentlyDeleteMultiple(
    //     payload: IPermanentlyDeleteMultipleChannelModel,
    // ): Promise<DeleteResult | null> {
    //     console.log('payload', payload);
    //     return await channelSchema.deleteMany({ serverId: payload.serverId, _id: { $in: payload.channelIds } });
    // }
}
