import CurriculumController from '@/controllers/curriculum.controller';
import { Authentication } from '@/core/middlewares/auth.middleware';
import { Router } from 'express';

const router: Router = Router();
const curriculumController = new CurriculumController();
router
    .route('/:id')
    .get(curriculumController.getById.bind(curriculumController))
    .put(Authentication.admin, curriculumController.update.bind(curriculumController))
    .delete(Authentication.admin, curriculumController.permanentlyDelete.bind(curriculumController));
router
    .route('/')
    .get(curriculumController.getList.bind(curriculumController))
    .post(Authentication.admin, curriculumController.create.bind(curriculumController));

export default router;
