import { EnumUserRole } from '@/core/constants/common.constant';
import type { TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
import type { IUserEntity } from '@/database/entities/user.entity';
import userSchema from '@/database/schemas/user.schema';
import type { UpdateQuery } from 'mongoose';
import { BaseRepository } from './base-core.repository';

export class UserRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async checkUserExists(id: string): Promise<{ _id: string } | null> {
        return await userSchema.exists({ _id: id });
    }

    public async getList(): Promise<IUserEntity[]> {
        return await userSchema.find();
    }

    public async getById(id: string): Promise<IUserEntity | null> {
        return await userSchema.findById(id);
    }

    public async getByCode(code: string): Promise<IUserEntity | null> {
        return await userSchema.findOne({ code });
    }

    public async getByEmail(email: string): Promise<IUserEntity | null> {
        return await userSchema.findOne({ email });
    }

    public async getRoleRecord(role: number): Promise<IUserEntity | null> {
        return (await userSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<IUserEntity | null> {
        return (await userSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getCourseMultipleId(requirementIds: string[]) {
        return await userSchema.find({ _id: { $in: requirementIds } });
    }

    public async create(payload: IUserEntity): Promise<IUserEntity | null> {
        return await userSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: IUserEntity): Promise<IUserEntity | null> {
        return await userSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }

    public async updateRecord(options: TypeOptionUpdateRecord<IUserEntity>): Promise<IUserEntity | null> {
        return await userSchema.findOneAndUpdate(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async updateManyRecord(options: TypeOptionUpdateRecord<IUserEntity>): Promise<UpdateQuery<IUserEntity>> {
        return await userSchema.updateMany(options.updateCondition, options.updateQuery, {
            new: true,
            upsert: true,
        });
    }

    public async permanentlyDelete(id: string): Promise<IUserEntity | null> {
        return await userSchema.findOneAndDelete({ _id: id });
    }
}
