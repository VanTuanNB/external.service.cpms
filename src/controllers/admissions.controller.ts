import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { AdmissionsService } from '@/services/admissions.service';
import type { Request, Response } from 'express';
import {
    CreateAdmissionsFilterModel,
    GetInfoAdmissionsFilterModel,
    GetPagingAdmissionsFilterModel,
    UpgradeToStudentAdmissionsFilterModel,
    type IPayloadGetListAdmissions,
} from './filters/admissions.filter';

export default class AdmissionsController {
    private admissionsService = new AdmissionsService();
    constructor() {}

    @Required(GetPagingAdmissionsFilterModel, EModePayload.QUERY)
    public async getList(req: Request, res: Response): Promise<Response> {
        const query = (req.query as Partial<IPayloadGetListAdmissions>) || {};
        const payload: IPayloadGetListAdmissions = {
            ...query,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        };
        const result = await this.admissionsService.getList(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoAdmissionsFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.admissionsService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateAdmissionsFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.admissionsService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(UpgradeToStudentAdmissionsFilterModel)
    public async upgradeToStudent(req: Request, res: Response): Promise<Response> {
        const result = await this.admissionsService.upgradeToStudent(req.body);
        return res.status(result.status).json(result);
    }
}
