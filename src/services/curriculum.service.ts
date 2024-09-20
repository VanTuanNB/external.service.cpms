import type {
    IPayloadCreateCurriculum,
    IPayloadGetListCurriculum,
    IPayloadUpdateCurriculum,
} from '@/controllers/filters/curriculum.filter';
import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer, QueryType } from '@/core/interfaces/common.interface';
import { CurriculumModel, type ICurriculumEntity } from '@/database/entities/curriculum.entity';
import { CurriculumRepository } from '@/repositories/curriculum.repository';
import { FacultyRepository } from '@/repositories/faculty.repository';
import moment from 'moment-timezone';

import { v4 as uuidV4 } from 'uuid';

export class CurriculumService {
    private curriculumRepository = new CurriculumRepository();
    private facultyRepository = new FacultyRepository();
    private validateInputService = new ValidatorInput();
    constructor() {}

    public async getList(payload: IPayloadGetListCurriculum): Promise<IResponseServer> {
        try {
            const { page = 1, limit = 10, keyword, durationStart, durationEnd } = payload;
            const skip = (page - 1) * limit;
            let query: QueryType = {};
            if (keyword) {
                query.$or = [
                    { title: { $regex: keyword, $options: 'i' } },
                    { code: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ];
            }

            if (durationStart && durationEnd) {
                query.durationStart = { $gte: durationStart };
                query.durationEnd = { $lte: durationEnd };
            }
            const paging = {
                skip,
                limit,
                page,
            };
            const { items, totalItems } = await this.curriculumRepository.getList(query, paging);
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
            const curriculumRecord = await this.curriculumRepository.getById(id);
            if (!curriculumRecord) return new ResponseHandler(404, false, 'Curriculum not found', null);
            return new ResponseHandler(200, true, 'Get curriculum successfully', curriculumRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async create(payload: IPayloadCreateCurriculum): Promise<IResponseServer> {
        try {
            const curriculumRecord = await this.curriculumRepository.getByCode(payload.code);
            if (curriculumRecord) {
                return new ResponseHandler(200, true, 'Curriculum is exits', curriculumRecord);
            }
            let facultyIds: string[] = [];
            if (payload.facultyIds && payload.facultyIds.length) {
                const faculties = await this.facultyRepository.getFacultiesMultipleId(payload.facultyIds);
                facultyIds = faculties.map((faculty) => faculty.id);
            }
            const id = uuidV4();
            const newCurriculum = new CurriculumModel({
                id,
                title: payload.title.trim(),
                description: payload.description?.trim(),
                code: payload.code.trim(),
                faculties: facultyIds,
                durationStart: payload.durationStart,
                durationEnd: payload.durationEnd,
            });
            const validation = await this.validateInputService.validate(newCurriculum);
            if (validation) return validation;
            if (newCurriculum.faculties.length) {
                await this.curriculumRepository.updateManyRecord({
                    updateCondition: { _id: { $nin: newCurriculum.id } },
                    updateQuery: {
                        $pull: { faculties: { $in: newCurriculum.faculties } },
                    },
                });
            }
            const newCurriculumRecord = await this.curriculumRepository.create(newCurriculum);
            if (!newCurriculumRecord) return new ResponseHandler(500, false, 'Can not create new curriculum', null);
            return new ResponseHandler(201, true, 'Create new curriculum successfully', newCurriculumRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async update(payload: IPayloadUpdateCurriculum): Promise<IResponseServer> {
        try {
            const curriculumRecord = await this.curriculumRepository.getById(payload.id);
            if (!curriculumRecord) {
                return new ResponseHandler(404, true, 'Curriculum not found', curriculumRecord);
            }
            let facultyIds: string[] = [];
            if (payload.facultyIds && payload.facultyIds.length) {
                const faculties = await this.facultyRepository.getFacultiesMultipleId(payload.facultyIds);
                facultyIds = faculties.map((faculty) => faculty.id);
            }
            const facultyIdsFiltered: string[] = curriculumRecord.faculties.filter(
                (faculty) => !payload.facultyIds.includes(faculty),
            );
            const newCurriculum = new CurriculumModel({
                id: payload.id,
                title: payload.title.trim() || curriculumRecord.title,
                description: payload.description?.trim() || curriculumRecord.title,
                code: payload.code.trim() || curriculumRecord.code,
                faculties: facultyIds,
                durationStart: payload.durationStart || curriculumRecord.durationStart,
                durationEnd: payload.durationEnd || curriculumRecord.durationEnd,
                createdAt: curriculumRecord.createdAt,
                updatedAt: moment().format(),
            });
            const validation = await this.validateInputService.validate(newCurriculum);
            if (validation) return validation;
            await this.curriculumRepository.updateManyRecord({
                updateCondition: { _id: { $nin: newCurriculum.id } },
                updateQuery: {
                    $pull: { faculties: { $in: newCurriculum.faculties } },
                },
            });
            let curriculumRecordUpdated: ICurriculumEntity | null = null;
            curriculumRecordUpdated = await this.curriculumRepository.updateRecord({
                updateCondition: { _id: newCurriculum.id },
                updateQuery: {
                    $set: {
                        title: newCurriculum.title,
                        description: newCurriculum.description,
                        code: newCurriculum.code,
                        durationStart: newCurriculum.durationStart,
                        durationEnd: newCurriculum.durationEnd,
                        updatedAt: newCurriculum.updatedAt,
                        createdAt: newCurriculum.createdAt,
                    },
                    $addToSet: { faculties: { $each: newCurriculum.faculties } },
                },
            });
            if (facultyIdsFiltered.length) {
                curriculumRecordUpdated = await this.curriculumRepository.updateRecord({
                    updateCondition: { _id: newCurriculum.id },
                    updateQuery: {
                        $pull: { faculties: { $in: facultyIdsFiltered } },
                    },
                });
            }
            if (!curriculumRecordUpdated) return new ResponseHandler(500, false, 'Can not update curriculum', null);
            return new ResponseHandler(200, true, 'Update curriculum successfully', curriculumRecordUpdated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(id: string): Promise<IResponseServer> {
        try {
            const curriculumRecord = await this.curriculumRepository.permanentlyDelete(id);
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
