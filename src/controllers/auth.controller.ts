import { Required } from '@/core/decorators/validate.decorator';
import { AuthService } from '@/services/auth.service';
import type { Request, Response } from 'express';
import { LoginPayloadFilterModel, RegisterPayloadFilterModel } from './filters/auth.filter';

export default class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    @Required(RegisterPayloadFilterModel)
    public async register(req: Request, res: Response): Promise<Response> {
        const result = await this.authService.register(req.body);
        return res.status(result.status).json(result);
    }

    @Required(LoginPayloadFilterModel)
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const result = await this.authService.login({ email, password });
        return res.status(result.status).json(result);
    }
}
