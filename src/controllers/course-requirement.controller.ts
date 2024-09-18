import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { CourseRequirementService } from '@/services/course-requirement.service';
import type { Request, Response } from 'express';
import {
    CreateCourseRequirementFilterModel,
    GetInfoCourseRequirementFilterModel,
    UpdateCourseRequirementFilterModel,
} from './filters/course-requirement.filter';

export default class CourseRequirementController {
    private curriculumRequirementService = new CourseRequirementService();
    constructor() {}

    public async getList(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumRequirementService.getList();
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCourseRequirementFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumRequirementService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateCourseRequirementFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumRequirementService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCourseRequirementFilterModel, EModePayload.PARAMS)
    @Required(UpdateCourseRequirementFilterModel)
    public async update(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign(req.body, req.params);
        const result = await this.curriculumRequirementService.update(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCourseRequirementFilterModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const result = await this.curriculumRequirementService.permanentlyDelete(req.params.id);
        return res.status(result.status).json(result);
    }
}
