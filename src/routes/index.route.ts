// import ExceptionController from '@/controllers/exception.controller';
import { Router } from 'express';
// import authRouter from './auth.route';
// import friendRouter from './friend.route';
// import inviteRouter from './invite.route';
// import serverRouter from './server.route';
// import userRouter from './user.route';
const rootRouter = Router();

rootRouter.use('/auth', (req, res) => {
    return res.send('213123123');
});
// rootRouter.use('/user', userRouter);
// rootRouter.use('/server', serverRouter);
// rootRouter.use('/friend', friendRouter);
// rootRouter.use('/invite', inviteRouter);
// rootRouter.use('*', new ExceptionController().endpointException);

export default rootRouter;
