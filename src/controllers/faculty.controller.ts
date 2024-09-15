import { Required } from '@/core/decorators/validate.decorator';
import { FacultyService } from '@/services/faculty.service';
import type { Request, Response } from 'express';
import { CreateFacultyFilterModel } from './filters/faculty.filter';

export default class FacultyController {
    private facultyService = new FacultyService();
    constructor() {}

    // public async getList(req: Request, res: Response): Promise<Response> {
    //     const result = await this.facultyService.getList();
    //     return res.status(result.status).json(result);
    // }

    // @Required(GetInfoCurriculumFilterModel, EModePayload.PARAMS)
    // public async getById(req: Request, res: Response): Promise<Response> {
    //     const result = await this.facultyService.getById(req.params.id);
    //     return res.status(result.status).json(result);
    // }

    @Required(CreateFacultyFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.facultyService.create(req.body);
        return res.status(result.status).json(result);
    }

    // @Required(CreateRoleFilterModel)
    // public async update(req: Request, res: Response): Promise<Response> {
    //     const result = await this.facultyService.update(req.body);
    //     return res.status(result.status).json(result);
    // }

    // @Required(GetInfoCurriculumFilterModel, EModePayload.PARAMS)
    // public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
    //     const result = await this.facultyService.permanentlyDelete(req.params.id);
    //     return res.status(result.status).json(result);
    // }
}
