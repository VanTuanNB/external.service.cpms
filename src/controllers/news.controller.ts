import { EModePayload, Required } from '@/core/decorators/validate.decorator';
import { NewsService } from '@/services/news.service';
import type { Request, Response } from 'express';
import { CreateNewsFilterModel, GetInfoNewsFilterModel } from './filters/news.filter';

export default class NewsController {
    private newsService = new NewsService();
    constructor() {}

    public async getList(req: Request, res: Response): Promise<Response> {
        const result = await this.newsService.getList();
        return res.status(result.status).json(result);
    }

    @Required(GetInfoNewsFilterModel, EModePayload.PARAMS)
    public async getById(req: Request, res: Response): Promise<Response> {
        const result = await this.newsService.getById(req.params.id);
        return res.status(result.status).json(result);
    }

    @Required(CreateNewsFilterModel)
    public async create(req: Request, res: Response): Promise<Response> {
        const result = await this.newsService.create(req.body);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoNewsFilterModel, EModePayload.PARAMS)
    @Required(CreateNewsFilterModel)
    public async update(req: Request, res: Response): Promise<Response> {
        const payload = Object.assign(req.body, req.params);
        const result = await this.newsService.update(payload);
        return res.status(result.status).json(result);
    }

    @Required(GetInfoNewsFilterModel, EModePayload.PARAMS)
    public async permanentlyDelete(req: Request, res: Response): Promise<Response> {
        const result = await this.newsService.permanentlyDelete(req.params.id);
        return res.status(result.status).json(result);
    }
}
