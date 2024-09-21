import type {
    IPayloadGetListUser,
    IPayloadUpdateUser,
    IPayloadUserRegisterCourse,
} from '@/controllers/filters/user.filter';
import { EnumUserCourseStatus } from '@/core/constants/common.constant';
import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer, QueryType } from '@/core/interfaces/common.interface';
import { CoursesRegistering } from '@/database/entities/course-register.entity';
import { UserCourseModel } from '@/database/entities/user-course.entity';
import { UserModel } from '@/database/entities/user.entity';
import { CourseRegisterRepository } from '@/repositories/course-register.repository';
import { CourseRepository } from '@/repositories/course.repository';
import { UserCourseRepository } from '@/repositories/user-course.repository';
import { UserRepository } from '@/repositories/user.repository';
import moment from 'moment-timezone';
import { v4 as uuidV4 } from 'uuid';

export class UserService {
    private userRepository = new UserRepository();
    private courseRegisterRepository = new CourseRegisterRepository();
    private userCourseRepository = new UserCourseRepository();
    private courseRepository = new CourseRepository();
    private validateInputService = new ValidatorInput();
    constructor() {}

    public async getList(payload: IPayloadGetListUser): Promise<IResponseServer> {
        try {
            const { page = 1, limit = 10, keyword } = payload;
            const skip = (page - 1) * limit;
            let query: QueryType = {};
            if (keyword) {
                query.$or = [
                    { title: { $regex: keyword, $options: 'i' } },
                    { contents: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ];
            }
            const paging = {
                skip,
                limit,
                page,
            };
            const { items, totalItems } = await this.userRepository.getList(query, paging);
            const totalPages = Math.ceil(totalItems / limit);

            return new ResponseHandler(200, true, 'Get List curriculum successfully', {
                items,
                totalItems,
                totalPages,
                page,
                limit,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async getById(id: string): Promise<IResponseServer> {
        try {
            const user = await this.userRepository.getById(id);
            if (!user) return new ResponseHandler(404, false, 'User not found', null);
            return new ResponseHandler(200, true, 'Get user information successfully', user);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async registerCourse(payload: IPayloadUserRegisterCourse): Promise<IResponseServer> {
        try {
            const courseRegisterRecord = await this.courseRegisterRepository.getMetadataQuery({
                updateCondition: { user: payload.userId, $and: [{ course: { $in: payload.courseIds } }] },
                updateQuery: {},
            });
            if (courseRegisterRecord)
                return new ResponseHandler(400, true, 'Course registration is exits', courseRegisterRecord);
            const courseRecords = await this.courseRepository.getMetadataManyRecordQuery({
                updateCondition: { _id: { $in: payload.courseIds }, quantity: { $gt: 0 } },
                updateQuery: {},
            });
            if (!courseRecords.length)
                return new ResponseHandler(
                    400,
                    false,
                    'The number of participants for this course has reached its limit, please wait for further processing',
                    null,
                );
            const courseIds = courseRecords.map((course) => course.id);
            const newRecords = courseIds.map(
                (course) =>
                    new CoursesRegistering({
                        id: uuidV4(),
                        user: payload.userId,
                        course: course,
                    }),
            );
            const newCurriculumRecords = await this.courseRegisterRepository.insertMultiple(newRecords);
            if (!newCurriculumRecords) return new ResponseHandler(500, false, 'Can not create new curriculum', null);
            const userRecordUpdated = await this.userRepository.updateRecord({
                updateCondition: { _id: payload.userId },
                updateQuery: {
                    $addToSet: { coursesRegistering: { $each: newRecords.map((record) => record.id) } },
                },
            });
            return new ResponseHandler(201, true, 'Create new course register successfully', userRecordUpdated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async acceptRegisterCourse(payload: IPayloadUserRegisterCourse): Promise<IResponseServer> {
        try {
            const courseRegisterRecord = await this.courseRegisterRepository.getMetadataManyRecordQuery({
                updateCondition: { user: payload.userId, course: { $in: payload.courseIds } },
                updateQuery: {},
            });
            if (!courseRegisterRecord.length)
                return new ResponseHandler(400, true, 'Course registration not is exits', courseRegisterRecord);

            const userCourseRecords = courseRegisterRecord.map(
                (record) =>
                    new UserCourseModel({
                        id: uuidV4(),
                        user: record.user,
                        course: record.course,
                        status: EnumUserCourseStatus.PROCESSING,
                    }),
            );
            const newUserCourseRecords = await this.userCourseRepository.insertMultiple(userCourseRecords);
            if (!newUserCourseRecords)
                return new ResponseHandler(500, false, 'Can not create new course register', null);
            const userCourseIds = newUserCourseRecords.map((record) => record.id);
            const userUpdated = await this.userRepository.updateRecord({
                updateCondition: { _id: payload.userId },
                updateQuery: {
                    $addToSet: { courses: userCourseIds },
                    $pull: {
                        coursesRegistering: {
                            $in: courseRegisterRecord.map((record) => record.id || (record as any)._id),
                        },
                    },
                },
            });
            if (!userUpdated) return new ResponseHandler(500, false, 'Can not accept course for this user', null);
            await this.courseRegisterRepository.permanentlyDeleteMultiple(
                courseRegisterRecord.map((record) => record.id),
            );
            return new ResponseHandler(201, true, 'Create new course register successfully', userUpdated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async completeCourse(payload: IPayloadUserRegisterCourse): Promise<IResponseServer> {
        try {
            const courseRegisterRecord = await this.userCourseRepository.getMetadataManyRecordQuery({
                updateCondition: { user: payload.userId, course: { $in: payload.courseIds } },
                updateQuery: {},
            });
            if (!courseRegisterRecord.length)
                return new ResponseHandler(400, true, 'Course registration not is exits', courseRegisterRecord);
            const recordIds = courseRegisterRecord.map((record) => record.id || (record as any)._id);
            const courseRegisterRecordUpdated = await this.userCourseRepository.updateRecord({
                updateCondition: { _id: { $in: recordIds } },
                updateQuery: {
                    $set: {
                        status: EnumUserCourseStatus.COMPLETED,
                    },
                },
            });
            return new ResponseHandler(
                201,
                true,
                'Create new course register successfully',
                courseRegisterRecordUpdated,
            );
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async update(payload: IPayloadUpdateUser): Promise<IResponseServer> {
        try {
            const userRecord = await this.userRepository.getByIdNoPopulate(payload.id);
            if (!userRecord) {
                return new ResponseHandler(404, true, 'User not found', userRecord);
            }
            // let courseIds: string[] = [];
            // if (payload.courseIds && payload.courseIds.length) {
            //     const courses = await this.courseRepository.getCourseMultipleId(payload.courseIds);
            //     courseIds = courses.map((course) => course.id);
            // }
            // let coursesRegistering: string[] = [];
            // if (payload.courseRegisteringIds && payload.courseRegisteringIds.length) {
            //     const coursesRegister = await this.courseRegisterRepository.getCourseMultipleId(
            //         payload.courseRegisteringIds,
            //     );
            //     coursesRegistering = coursesRegister.map((course) => course.id);
            // }
            const newRecord = new UserModel({
                id: payload.id,
                email: payload.email.trim(),
                name: payload.name.trim(),
                birthday: payload.birthday,
                password: userRecord.password,
                address: payload.address?.trim(),
                phone: payload.phone?.trim(),
                roles: userRecord.roles,
                refreshToken: userRecord.refreshToken,
                updatedAt: moment().format(),
            });
            const validation = await this.validateInputService.validate(newRecord);
            if (validation) return validation;
            const userRecordUpdated = await this.userRepository.updateRecord({
                updateCondition: { _id: newRecord.id },
                updateQuery: {
                    $set: {
                        email: newRecord.email,
                        name: newRecord.name,
                        birthday: newRecord.birthday,
                        address: newRecord.address,
                        phone: newRecord.phone,
                        roles: newRecord.roles,
                        updatedAt: newRecord.updatedAt,
                    },
                },
            });
            if (!userRecordUpdated) return new ResponseHandler(500, false, 'Can not update user', null);
            return new ResponseHandler(200, true, 'Update curriculum successfully', userRecordUpdated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(id: string): Promise<IResponseServer> {
        try {
            const curriculumRecord = await this.userRepository.permanentlyDelete(id);
            if (!curriculumRecord) {
                return new ResponseHandler(404, false, `curriculum not found with id: ${id}`, null);
            }
            return new ResponseHandler(200, true, 'Deleted server successfully', curriculumRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
