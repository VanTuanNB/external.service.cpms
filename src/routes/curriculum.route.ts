import CurriculumController from '@/controllers/curriculum.controller';
import { Router } from 'express';

const router: Router = Router();
const curriculumController = new CurriculumController();
router
    .route('/:id')
    .get(curriculumController.getById.bind(curriculumController))
    .put(curriculumController.update.bind(curriculumController))
    .delete(curriculumController.permanentlyDelete.bind(curriculumController));
router
    .route('/')
    .get(curriculumController.getList.bind(curriculumController))
    .post(curriculumController.create.bind(curriculumController));

export default router;
