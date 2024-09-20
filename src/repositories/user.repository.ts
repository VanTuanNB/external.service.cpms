import { EnumUserRole } from '@/core/constants/common.constant';
import type { QueryPaging, QueryType, TypeOptionUpdateRecord } from '@/core/interfaces/common.interface';
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

    public async getList(
        queryData: QueryType,
        queryPaging: QueryPaging,
    ): Promise<{ items: IUserEntity[]; totalItems: number }> {
        const { skip, limit } = queryPaging;
        const items = await userSchema
            .find(queryData)
            .select('-refreshToken -password -roles -__v')
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'courses',
                model: 'user-courses',
                select: 'course status',
                populate: {
                    path: 'course',
                    model: 'courses',
                    select: 'title code description durationStart quantity durationEnd createdAt updatedAt',
                },
            })
            .populate({
                path: 'coursesRegistering',
                model: 'courses-registering',
                select: 'course',
                populate: {
                    path: 'course',
                    model: 'courses',
                    select: 'title code description durationStart quantity durationEnd createdAt updatedAt',
                },
            });

        // Transform the populated data
        const transformedItems = items.map((user) => ({
            ...user.toObject(),
            courses:
                user.courses?.map((course: any) => ({
                    id: course.course?._id.toString(),
                    title: course.course?.title,
                    code: course.course?.code,
                    description: course.course?.description,
                    durationStart: course.course?.durationStart,
                    durationEnd: course.course?.durationEnd,
                    quantity: course.course?.quantity,
                    createdAt: course.course?.createdAt,
                    updatedAt: course.course?.updatedAt,
                    status: course.status,
                })) || [],
            coursesRegistering:
                user.coursesRegistering?.map((course: any) => ({
                    id: course.course?._id.toString(),
                    title: course.course?.title,
                    code: course.course?.code,
                    description: course.course?.description,
                    durationStart: course.course?.durationStart,
                    durationEnd: course.course?.durationEnd,
                    quantity: course.course?.quantity,
                    createdAt: course.course?.createdAt,
                    updatedAt: course.course?.updatedAt,
                })) || [],
        }));

        const totalItems = await userSchema.countDocuments(queryData);

        return { items: transformedItems as any, totalItems };
    }

    public async getById(id: string): Promise<IUserEntity | null> {
        const user = await userSchema
            .findById(id)
            .select('-refreshToken -password -roles -__v')
            .populate({
                path: 'courses',
                model: 'user-courses',
                select: 'course status',
                populate: {
                    path: 'course',
                    model: 'courses',
                    select: 'title code description durationStart quantity durationEnd createdAt updatedAt',
                },
            })
            .populate({
                path: 'coursesRegistering',
                model: 'courses-registering',
                select: 'course',
                populate: {
                    path: 'course',
                    model: 'courses',
                    select: 'title code description durationStart quantity durationEnd createdAt updatedAt',
                },
            });

        if (!user) return null;

        const userObject = user.toObject();
        const { _id, ...restOfProperties } = userObject;
        const courses: any =
            restOfProperties.courses?.map((course: any) => ({
                id: course.course?._id.toString(),
                title: course.course?.title,
                code: course.course?.code,
                description: course.course?.description,
                durationStart: course.course?.durationStart,
                durationEnd: course.course?.durationEnd,
                quantity: course.course?.quantity,
                status: course.status,
            })) || [];
        const coursesRegistering: any =
            restOfProperties.coursesRegistering?.map((course: any) => ({
                id: course.course?._id.toString(),
                title: course.course?.title,
                code: course.course?.code,
                description: course.course?.description,
                durationStart: course.course?.durationStart,
                durationEnd: course.course?.durationEnd,
                quantity: course.course?.quantity,
            })) || [];

        return { ...restOfProperties, id: _id.toString(), courses, coursesRegistering } as IUserEntity;
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
