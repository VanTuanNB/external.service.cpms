import { EnumUserRole } from '@/core/constants/common.constant';
import type { IFacultyEntity } from '@/database/entities/faculty.entity';
import facultySchema from '@/database/schemas/facultiy.schema';
import { BaseRepository } from './base-core.repository';

export class FacultyRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getList(): Promise<IFacultyEntity[]> {
        return await facultySchema.find();
    }

    public async getById(id: string): Promise<IFacultyEntity | null> {
        return await facultySchema.findById(id);
    }

    public async getByCode(code: string): Promise<IFacultyEntity | null> {
        return await facultySchema.findOne({ code });
    }

    public async getRoleRecord(role: number): Promise<IFacultyEntity | null> {
        return (await facultySchema.findOne({ role })) as any;
    }

    public async getUserRoleRecord(): Promise<IFacultyEntity | null> {
        return (await facultySchema.findOne({ role: EnumUserRole.USER })) as any;
    }

    public async getFacultiesMultipleId(facultyIds: string[]) {
        return await facultySchema.find({ _id: { $in: facultyIds } });
    }

    public async create(payload: IFacultyEntity): Promise<IFacultyEntity | null> {
        return await facultySchema.create({ _id: payload.id, ...payload });
    }

    public async update(payload: IFacultyEntity): Promise<IFacultyEntity | null> {
        return await facultySchema.findByIdAndUpdate({ _id: payload.id }, payload, { new: true, upsert: true });
    }

    public async permanentlyDelete(id: string): Promise<IFacultyEntity | null> {
        return await facultySchema.findOneAndDelete({ _id: id });
    }

    // public async permanentlyDeleteMultiple(
    //     payload: IPermanentlyDeleteMultipleChannelModel,
    // ): Promise<DeleteResult | null> {
    //     console.log('payload', payload);
    //     return await channelSchema.deleteMany({ serverId: payload.serverId, _id: { $in: payload.channelIds } });
    // }
}
