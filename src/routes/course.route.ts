import CourseController from '@/controllers/course.controller';
import { Authentication } from '@/core/middlewares/auth.middleware';
import { Router } from 'express';

const router: Router = Router();
const courseController = new CourseController();
router
    .route('/:id')
    .get(courseController.getById.bind(courseController))
    .put(Authentication.admin, courseController.update.bind(courseController))
    .delete(Authentication.admin, courseController.permanentlyDelete.bind(courseController));
router
    .route('/')
    .get(courseController.getList.bind(courseController))
    .post(Authentication.admin, courseController.create.bind(courseController));

export default router;
