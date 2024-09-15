import ExceptionController from '@/controllers/exception.controller';
import { Router } from 'express';
import authRouter from './auth.route';
import curriculumRouter from './curriculum.route';
import facultyRouter from './faculty.route';
import roleRouter from './role.route';
import schoolRouter from './school.route';
// import friendRouter from './friend.route';
// import inviteRouter from './invite.route';
// import serverRouter from './server.route';
// import userRouter from './user.route';
const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/role', roleRouter);
rootRouter.use('/school', schoolRouter);
rootRouter.use('/curriculum', curriculumRouter);
rootRouter.use('/faculty', facultyRouter);
// rootRouter.use('/user', userRouter);
// rootRouter.use('/server', serverRouter);
// rootRouter.use('/friend', friendRouter);
// rootRouter.use('/invite', inviteRouter);
rootRouter.use('*', new ExceptionController().endpointException);

export default rootRouter;
