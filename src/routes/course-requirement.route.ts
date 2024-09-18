import CourseRequirementController from '@/controllers/course-requirement.controller';
import { Authentication } from '@/core/middlewares/auth.middleware';
import { Router } from 'express';

const router: Router = Router();
const courseRequirementController = new CourseRequirementController();
router
    .route('/:id')
    .get(courseRequirementController.getById.bind(courseRequirementController))
    .put(Authentication.admin, courseRequirementController.update.bind(courseRequirementController))
    .delete(Authentication.admin, courseRequirementController.permanentlyDelete.bind(courseRequirementController));
router
    .route('/')
    .get(courseRequirementController.getList.bind(courseRequirementController))
    .post(Authentication.admin, courseRequirementController.create.bind(courseRequirementController));

export default router;
