import type {
    IPayloadCreateCourseRequirement,
    IPayloadUpdateCourseRequirement,
} from '@/controllers/filters/course-requirement.filter';
import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { CourseRequirementModel } from '@/database/entities/course-requirement.entity';
import { CourseRequirementRepository } from '@/repositories/course-requirement.repository';
import { CourseRepository } from '@/repositories/course.repository';
import moment from 'moment-timezone';
import { v4 as uuidV4 } from 'uuid';

export class CourseRequirementService {
    private courseRequirementRepository = new CourseRequirementRepository();
    private validateInputService = new ValidatorInput();
    private courseRepository = new CourseRepository();
    constructor() {}

    public async getList(): Promise<IResponseServer> {
        try {
            const courseRequirementRecords = await this.courseRequirementRepository.getList();
            return new ResponseHandler(200, true, 'Get list course requirement successfully', courseRequirementRecords);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async getById(id: string): Promise<IResponseServer> {
        try {
            const courseRequirementRecord = await this.courseRequirementRepository.getById(id);
            return new ResponseHandler(200, true, 'Get info course requirement successfully', courseRequirementRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async create(payload: IPayloadCreateCourseRequirement): Promise<IResponseServer> {
        try {
            const courseRequirementRecord = await this.courseRequirementRepository.getByCode(payload.code);
            if (courseRequirementRecord) {
                return new ResponseHandler(200, true, 'Course requirement is exits', courseRequirementRecord);
            }
            const courseRecord = await this.courseRepository.getById(payload.courseId);
            if (!courseRecord) return new ResponseHandler(404, true, 'Faculty not found', courseRecord);
            const id = uuidV4();
            const newCourseRequirement = new CourseRequirementModel({
                id,
                code: payload.code,
                course: payload.courseId,
                title: payload.title.trim(),
                description: payload.description?.trim(),
            });
            const validation = await this.validateInputService.validate(newCourseRequirement);
            if (validation) return validation;
            const newFacultyRecord = await this.courseRequirementRepository.create(newCourseRequirement);
            if (!newFacultyRecord)
                return new ResponseHandler(500, false, 'Can not create new course requirement', null);
            return new ResponseHandler(201, true, 'Create new course requirement successfully', newFacultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async update(payload: IPayloadUpdateCourseRequirement): Promise<IResponseServer> {
        try {
            const courseRequirementRecord = await this.courseRequirementRepository.getById(payload.id);
            if (!courseRequirementRecord) {
                return new ResponseHandler(404, true, `Course requirement with id ${payload.id} not found`, null);
            }
            const courseRequirementInstance = new CourseRequirementModel({
                id: payload.id,
                title: payload.title.trim(),
                description: payload.description?.trim(),
                code: payload.code.trim(),
                course: payload.courseId || '',
                updatedAt: moment().format(),
            });
            const validation = await this.validateInputService.validate(courseRequirementInstance);
            if (validation) return validation;
            const courseRecordRequirementUpdated = await this.courseRequirementRepository.updateRecord({
                updateCondition: { _id: courseRequirementInstance.id },
                updateQuery: {
                    $set: {
                        title: courseRequirementInstance.title,
                        description: courseRequirementInstance.description,
                        code: courseRequirementInstance.code,
                        course: courseRequirementInstance.course,
                        updatedAt: courseRequirementInstance.updatedAt,
                    },
                },
            });
            return new ResponseHandler(
                200,
                true,
                'Update the course requirement successfully',
                courseRecordRequirementUpdated,
            );
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(id: string): Promise<IResponseServer> {
        try {
            const facultyRecord = await this.courseRequirementRepository.permanentlyDelete(id);
            if (!facultyRecord) {
                return new ResponseHandler(404, false, `Course requirement not found with id: ${id}`, null);
            }
            return new ResponseHandler(200, true, 'Deleted course requirement successfully', facultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
