import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { SchoolService } from '@/services/school.service';
import type { Request, Response } from 'express';
import { CreateSchoolFilterModel, GetInfoSchoolFilterModel } from './filters/school.filter';

export default class SchoolController {
    private schoolService = new SchoolService();
    constructor() {}

    public async getList(req: Request, res: Response): Promise<Response> {
        const result = await this.schoolService.getList();
        return res.status(result.status).json(result);
    }

    @Required(GetInfoSchoolFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.schoolService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateSchoolFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.schoolService.create(req.body);
        return res.status(result.status).json(result);
    }
}
