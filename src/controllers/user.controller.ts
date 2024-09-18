import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import type { RequestAuthorized } from '@/core/interfaces/common.interface';
import { UserService } from '@/services/user.service';
import type { Request, Response } from 'express';
import {
    CourseRegisterFilterModel,
    GetInfoUserFilterModel,
    UserAcceptCourseRegisterFilterModel,
    UserCourseRegisterFilterModel,
} from './filters/user.filter';

export default class UserController {
    private userService = new UserService();
    constructor() {}

    public async getList(req: Request, res: Response): Promise<Response> {
        const result = await this.userService.getList();
        return res.status(result.status).json(result);
    }

    @Required(GetInfoUserFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.userService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(UserCourseRegisterFilterModel)
    public async registerCourse(req: RequestAuthorized, res: Response): Promise<Response> {
        const result = await this.userService.registerCourse(Object.assign(req.body, { userId: req.user?.id }));
        return res.status(result.status).json(result);
    }

    @Required(UserAcceptCourseRegisterFilterModel)
    public async acceptRegisterCourse(req: RequestAuthorized, res: Response): Promise<Response> {
        const result = await this.userService.acceptRegisterCourse(Object.assign(req.body));
        return res.status(result.status).json(result);
    }

    @Required(UserCourseRegisterFilterModel)
    public async completeCourse(req: RequestAuthorized, res: Response): Promise<Response> {
        const result = await this.userService.completeCourse(Object.assign(req.body));
        return res.status(result.status).json(result);
    }

    @Required(GetInfoUserFilterModel, EModePayload.PARAMS)
    @Required(CourseRegisterFilterModel)
    public async update(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign(req.body, req.params);
        const result = await this.userService.update(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoUserFilterModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const result = await this.userService.permanentlyDelete(req.params.id);
        return res.status(result.status).json(result);
    }
}
