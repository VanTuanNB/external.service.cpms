import AuthController from '@/controllers/auth.controller';
import { Router } from 'express';

const router: Router = Router();
const authControllerInstance = new AuthController();
router.route('/register').post(authControllerInstance.register.bind(authControllerInstance));
router.route('/login').post(authControllerInstance.login.bind(authControllerInstance));

export default router;
