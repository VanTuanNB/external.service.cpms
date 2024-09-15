import { Required } from '@/core/decorators/validate.decorator';
import { RoleService } from '@/services/role.service';
import type { Request, Response } from 'express';
import { CreateRoleFilterModel } from './filters/role.filter';

export default class RoleController {
    private roleService = new RoleService();
    constructor() {}

    @Required(CreateRoleFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.roleService.create(req.body);
        return res.status(result.status).json(result);
    }
}
