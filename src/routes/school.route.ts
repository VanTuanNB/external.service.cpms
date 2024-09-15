import SchoolController from '@/controllers/school.controller';
import { Router } from 'express';

const router: Router = Router();
const schoolController = new SchoolController();
router.route('/:id').get(schoolController.getById.bind(schoolController));
router
    .route('/')
    .get(schoolController.getList.bind(schoolController))
    .post(schoolController.create.bind(schoolController));

export default router;
