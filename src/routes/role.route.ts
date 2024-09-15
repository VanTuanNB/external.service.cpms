import RoleController from '@/controllers/role.controller';
import { Router } from 'express';

const router: Router = Router();
const roleController = new RoleController();
router.route('/').post(roleController.create.bind(roleController));

export default router;
