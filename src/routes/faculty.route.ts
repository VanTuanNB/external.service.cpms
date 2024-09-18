import FacultyController from '@/controllers/faculty.controller';
import { Authentication } from '@/core/middlewares/auth.middleware';
import { Router } from 'express';

const router: Router = Router();
const facultyController = new FacultyController();
router
    .route('/:id')
    .get(facultyController.getById.bind(facultyController))
    .put(Authentication.admin, facultyController.update.bind(facultyController))
    .delete(Authentication.admin, facultyController.permanentlyDelete.bind(facultyController));
router
    .route('/')
    .get(facultyController.getList.bind(facultyController))
    .post(Authentication.admin, facultyController.create.bind(facultyController));

export default router;
