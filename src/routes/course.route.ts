import CourseController from '@/controllers/course.controller';
import { Router } from 'express';

const router: Router = Router();
const courseController = new CourseController();
router
    .route('/:id')
    .get(courseController.getById.bind(courseController))
    .put(courseController.update.bind(courseController))
    .delete(courseController.permanentlyDelete.bind(courseController));
router
    .route('/')
    .get(courseController.getList.bind(courseController))
    .post(courseController.create.bind(courseController));

export default router;
