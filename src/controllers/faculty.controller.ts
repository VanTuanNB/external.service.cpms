import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { FacultyService } from '@/services/faculty.service';
import type { Request, Response } from 'express';
import {
    CreateFacultyFilterModel,
    GetInfoFacultyFilterModel,
    GetPagingFacultyFilterModel,
    UpdateFacultyFilterModel,
    type IPayloadGetListFaculty,
} from './filters/faculty.filter';

export default class FacultyController {
    private facultyService = new FacultyService();
    constructor() {}

    @Required(GetPagingFacultyFilterModel, EModePayload.QUERY)
    public async getList(req: Request, res: Response): Promise<Response> {
        const query = (req.query as Partial<IPayloadGetListFaculty>) || {};
        const payload: IPayloadGetListFaculty = {
            ...query,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        };
        const result = await this.facultyService.getList(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoFacultyFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.facultyService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateFacultyFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.facultyService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoFacultyFilterModel, EModePayload.PARAMS)
    @Required(UpdateFacultyFilterModel)
    public async update(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign(req.body, req.params);
        const result = await this.facultyService.update(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoFacultyFilterModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const result = await this.facultyService.permanentlyDelete(req.params.id);
        return res.status(result.status).json(result);
    }
}
