import { EnumUserRole } from '@/core/constants/common.constant';
import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { ICurriculumEntity } from '@/database/entities/curriculum.entity';
import curriculumSchema from '@/database/schemas/curriculum.schema';
import { BaseRepository } from './base-core.repository';

export class CurriculumRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<ICurriculumEntity[]> {
        return await curriculumSchema.find();
    }

    public async getById(id: string): Promise<ICurriculumEntity | null> {
        return await curriculumSchema.findById(id);
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

    public async updateRecord(options: TypeOptionUpdateRecord<ICurriculumEntity>): Promise<ICurriculumEntity | null> {
        const { queryFieldName, queryFieldValue, updateQuery } = options;
        return await curriculumSchema.findOneAndUpdate({ [queryFieldName]: queryFieldValue }, updateQuery, {
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
