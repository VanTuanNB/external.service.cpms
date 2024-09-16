import type { IPayloadCreateFaculty } from '@/controllers/filters/faculty.filter';
import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { FacultyModel } from '@/database/entities/faculty.entity';
import { CurriculumRepository } from '@/repositories/curriculum.repository';

import { FacultyRepository } from '@/repositories/faculty.repository';
import { v4 as uuidV4 } from 'uuid';

export class FacultyService {
    private facultyRepository = new FacultyRepository();
    private curriculumRepository = new CurriculumRepository();
    private validateInputService = new ValidatorInput();
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
            const newFacultyRecord = await this.facultyRepository.create(newFaculty);
            if (!newFacultyRecord) return new ResponseHandler(500, false, 'Can not create new account', null);
            return new ResponseHandler(201, true, 'Create new faculty successfully', newFacultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async update(payload: IPayloadCreateFaculty): Promise<IResponseServer> {
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
            const newFacultyRecord = await this.facultyRepository.create(newFaculty);
            if (!newFacultyRecord) return new ResponseHandler(500, false, 'Can not create new account', null);
            return new ResponseHandler(201, true, 'Create new faculty successfully', newFacultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(id: string): Promise<IResponseServer> {
        try {
            const facultyRecord = await this.facultyRepository.permanentlyDelete(id);
            if (!facultyRecord) {
                return new ResponseHandler(404, false, `faculty not found with id: ${id}`, null);
            }
            return new ResponseHandler(200, true, 'Deleted server successfully', facultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
