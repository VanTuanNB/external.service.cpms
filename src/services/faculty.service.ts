import type { IPayloadCreateFaculty } from '@/controllers/filters/faculty.filter';
import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { FacultyModel, type IFacultyEntity } from '@/database/entities/faculty.entity';
import { CourseRepository } from '@/repositories/course.repository';
import { CurriculumRepository } from '@/repositories/curriculum.repository';

import { FacultyRepository } from '@/repositories/faculty.repository';
import moment from 'moment-timezone';
import { v4 as uuidV4 } from 'uuid';

export class FacultyService {
    private facultyRepository = new FacultyRepository();
    private curriculumRepository = new CurriculumRepository();
    private validateInputService = new ValidatorInput();
    private courseRepository = new CourseRepository();
    constructor() {}

    public async getList(): Promise<IResponseServer> {
        try {
            const facultyRecords = await this.facultyRepository.getList();
            return new ResponseHandler(200, true, 'Get list faculty successfully', facultyRecords);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async getById(id: string): Promise<IResponseServer> {
        try {
            const facultyRecords = await this.facultyRepository.getById(id);
            if (!facultyRecords) return new ResponseHandler(404, false, 'Faculty not found', null);
            return new ResponseHandler(200, true, 'Get info faculty successfully', facultyRecords);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async create(payload: IPayloadCreateFaculty): Promise<IResponseServer> {
        try {
            const facultyRecord = await this.facultyRepository.getByCode(payload.code);
            if (facultyRecord) {
                return new ResponseHandler(200, true, 'Faculty is exits', facultyRecord);
            }
            const curriculumRecord = await this.curriculumRepository.getById(payload.curriculumId);
            if (!curriculumRecord) return new ResponseHandler(404, true, 'Curriculum not found', curriculumRecord);
            // if (!curriculumRecord) return new ResponseHandler(404, true, 'Curriculum not found', curriculumRecord);
            // continue handle case courses
            const id = uuidV4();
            const newFaculty = new FacultyModel({
                id,
                code: payload.code,
                courses: payload.courseIds || [],
                curriculum: payload.curriculumId,
                durationStart: payload.durationStart,
                durationEnd: payload.durationEnd,
                title: payload.title.trim(),
                description: payload.description?.trim(),
            });
            const validation = await this.validateInputService.validate(newFaculty);
            if (validation) return validation;
            if (newFaculty.courses) {
                await this.facultyRepository.updateManyRecord({
                    updateCondition: { _id: { $nin: newFaculty.id } },
                    updateQuery: {
                        $pull: { courses: { $in: newFaculty.courses } },
                    },
                });
            }
            const newFacultyRecord = await this.facultyRepository.create(newFaculty);
            if (!newFacultyRecord) return new ResponseHandler(500, false, 'Can not create new faculty', null);
            return new ResponseHandler(201, true, 'Create new faculty successfully', newFacultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async update(payload: IPayloadCreateFaculty): Promise<IResponseServer> {
        try {
            const facultyRecord = await this.facultyRepository.getById(payload.id);
            if (!facultyRecord) {
                return new ResponseHandler(404, true, `Faculty with id ${payload.id} not found`, facultyRecord);
            }
            let courseIds: string[] = [];
            if (payload.courseIds && payload.courseIds.length) {
                const faculties = await this.courseRepository.getCourseMultipleId(payload.courseIds);
                courseIds = faculties.map((faculty) => faculty.id);
            }
            const courseIdsFiltered: string[] = facultyRecord.courses.filter(
                (course) => !payload.courseIds.includes(course),
            );
            const facultyInstance = new FacultyModel({
                id: payload.id,
                title: payload.title.trim() || facultyRecord.title,
                description: payload.description?.trim() || facultyRecord.title,
                code: payload.code.trim() || facultyRecord.code,
                courses: courseIds,
                durationStart: payload.durationStart || facultyRecord.durationStart,
                durationEnd: payload.durationEnd || facultyRecord.durationEnd,
                curriculum: payload.curriculumId,
                updatedAt: moment().format(),
            });
            console.log('facultyInstance', facultyInstance);
            const validation = await this.validateInputService.validate(facultyInstance);
            if (validation) return validation;
            await this.facultyRepository.updateManyRecord({
                updateCondition: { _id: { $nin: facultyInstance.id } },
                updateQuery: {
                    $pull: { courses: { $in: facultyInstance.courses } },
                },
            });
            let facultyRecordUpdated: IFacultyEntity | null = null;
            facultyRecordUpdated = await this.facultyRepository.updateRecord({
                updateCondition: { _id: facultyInstance.id },
                updateQuery: {
                    $set: {
                        title: facultyInstance.title,
                        description: facultyInstance.description,
                        code: facultyInstance.code,
                        durationStart: facultyInstance.durationStart,
                        durationEnd: facultyInstance.durationEnd,
                        curriculum: facultyInstance.curriculum,
                        updatedAt: facultyInstance.updatedAt,
                        createdAt: facultyInstance.createdAt,
                    },
                    $addToSet: { courses: { $each: facultyInstance.courses } },
                },
            });
            if (courseIdsFiltered.length) {
                facultyRecordUpdated = await this.facultyRepository.updateRecord({
                    updateCondition: { _id: facultyInstance.id },
                    updateQuery: {
                        $pull: { courses: { $in: courseIdsFiltered } },
                    },
                });
            }
            if (!facultyRecordUpdated) return new ResponseHandler(500, false, 'Can not update faculty record', null);
            return new ResponseHandler(200, true, 'Update the faculty successfully', facultyRecordUpdated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(id: string): Promise<IResponseServer> {
        try {
            const facultyRecord = await this.facultyRepository.permanentlyDelete(id);
            if (!facultyRecord) {
                return new ResponseHandler(404, false, `Faculty not found with id: ${id}`, null);
            }
            return new ResponseHandler(200, true, 'Deleted faculty successfully', facultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
