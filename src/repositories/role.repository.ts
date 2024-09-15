import { EnumUserRole } from '@/core/constants/common.constant';
import type { IRoleEntity } from '@/database/entities/role.entity';
import roleSchema from '@/database/schemas/role.schema';
import { BaseRepository } from './base-core.repository';

export class RoleRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<IRoleEntity[]> {
        return await roleSchema.find().lean();
    }

    public async getById(id: string): Promise<IRoleEntity | null> {
        return await roleSchema.findById(id);
    }

    public async getRoleRecord(role: number): Promise<IRoleEntity | null> {
        return (await roleSchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<IRoleEntity | null> {
        return (await roleSchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async create(payload: IRoleEntity): Promise<IRoleEntity | null> {
        return await roleSchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: IRoleEntity): Promise<IRoleEntity | null> {
        return await roleSchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }
}
