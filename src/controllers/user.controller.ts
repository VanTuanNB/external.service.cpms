import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { UserService } from '@/services/user.service';
import type { Request, Response } from 'express';
import { CreateUserFilterModel, GetInfoUserFilterModel } from './filters/user.filter';

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

    @Required(CreateUserFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.userService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoUserFilterModel, EModePayload.PARAMS)
    @Required(CreateUserFilterModel)
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
