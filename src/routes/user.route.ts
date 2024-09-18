import UserController from '@/controllers/user.controller';
import { Router } from 'express';

const router: Router = Router();
const userController = new UserController();
router
    .route('/:id')
    .get(userController.getById.bind(userController))
    .put(userController.update.bind(userController))
    .delete(userController.permanentlyDelete.bind(userController));
router.route('/').get(userController.getList.bind(userController)).post(userController.create.bind(userController));

export default router;
