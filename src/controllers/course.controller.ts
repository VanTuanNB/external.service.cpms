import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { CourseService } from '@/services/course.service';
import type { Request, Response } from 'express';
import {
    CreateCourseFilterModel,
    GetInfoCourseFilterModel,
    GetPagingCourseFilterModel,
    UpdateCourseFilterModel,
    type IPayloadGetListCourse,
} from './filters/course.filter';

export default class CourseController {
    private courseService = new CourseService();
    constructor() {}

    @Required(GetPagingCourseFilterModel, EModePayload.QUERY)
    public async getList(req: Request, res: Response): Promise<Response> {
        const query = (req.query as Partial<IPayloadGetListCourse>) || {};
        const payload: IPayloadGetListCourse = {
            ...query,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        };
        const result = await this.courseService.getList(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCourseFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.courseService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateCourseFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.courseService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCourseFilterModel, EModePayload.PARAMS)
    @Required(UpdateCourseFilterModel)
    public async update(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign(req.body, req.params);
        const result = await this.courseService.update(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoCourseFilterModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const result = await this.courseService.permanentlyDelete(req.params.id);
        return res.status(result.status).json(result);
    }
}
