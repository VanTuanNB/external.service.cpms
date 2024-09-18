import CourseRequirementController from '@/controllers/course-requirement.controller';
import { Router } from 'express';

const router: Router = Router();
const courseRequirementController = new CourseRequirementController();
router
    .route('/:id')
    .get(courseRequirementController.getById.bind(courseRequirementController))
    .put(courseRequirementController.update.bind(courseRequirementController))
    .delete(courseRequirementController.permanentlyDelete.bind(courseRequirementController));
router
    .route('/')
    .get(courseRequirementController.getList.bind(courseRequirementController))
    .post(courseRequirementController.create.bind(courseRequirementController));

export default router;
