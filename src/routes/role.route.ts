import RoleController from '@/controllers/role.controller';
import { Authentication } from '@/core/middlewares/auth.middleware';
import { Router } from 'express';

const router: Router = Router();
const roleController = new RoleController();
router.route('/').post(Authentication.admin, roleController.create.bind(roleController));

export default router;
