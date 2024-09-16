import FacultyController from '@/controllers/faculty.controller';
import { Router } from 'express';

const router: Router = Router();
const facultyController = new FacultyController();
router
    .route('/:id')
    .get(facultyController.getById.bind(facultyController))
    .delete(facultyController.permanentlyDelete.bind(facultyController));
router
    .route('/')
    .get(facultyController.getList.bind(facultyController))
    .post(facultyController.create.bind(facultyController));

export default router;
