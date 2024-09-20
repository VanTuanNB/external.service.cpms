import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { CurriculumService } from '@/services/curriculum.service';
import type { Request, Response } from 'express';
import {
    CreateCurriculumFilterModel,
    GetInfoCurriculumFilterModel,
    GetPagingCurriculumFilterModel,
    UpdateCurriculumFilterModel,
    type IPayloadGetListCurriculum,
} from './filters/curriculum.filter';

export default class CurriculumController {
    private curriculumService = new CurriculumService();
    constructor() {}

    @Required(GetPagingCurriculumFilterModel, EModePayload.QUERY)
    public async getList(req: Request, res: Response): Promise<Response> {
        const query = (req.query as Partial<IPayloadGetListCurriculum>) || {};
        const payload: IPayloadGetListCurriculum = {
            ...query,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        };
        const result = await this.curriculumService.getList(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCurriculumFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateCurriculumFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCurriculumFilterModel, EModePayload.PARAMS)
    @Required(UpdateCurriculumFilterModel)
    public async update(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign(req.body, req.params);
        const result = await this.curriculumService.update(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCurriculumFilterModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumService.permanentlyDelete(req.params.id);
        return res.status(result.status).json(result);
    }
}
