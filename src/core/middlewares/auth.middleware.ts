import { type NextFunction, type Response } from 'express';
import { EnumUserRole } from '../constants/common.constant';
import { JWTHelper } from '../helpers/jwt.helper';
import { ResponseHandler } from '../helpers/response-handler.helper';
import type { IPayloadToken, RequestAuthorized } from '../interfaces/common.interface';

export class Authentication {
    private static jwtHelper = new JWTHelper();
    public static async user(req: RequestAuthorized, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const authentication = req.headers.authorization;
            const bearerToken = authentication && authentication.split('Bearer ')[1];
            if (!bearerToken) {
                const responseError = ResponseHandler.Unauthorized();
                return res.status(responseError.status).json(responseError);
            }
            const verify = Authentication.jwtHelper.verifyToken(bearerToken) as IPayloadToken | null;
            if (!verify) {
                const responseError = ResponseHandler.ForbiddenAccess();
                return res.status(responseError.status).json(responseError);
            }
            req.user = verify;
            next();
        } catch (error: any) {
            console.log(error);
            const responseError = ResponseHandler.InternalServer();
            return res.status(responseError.status).json(responseError);
        }
    }

    public static async admin(req: RequestAuthorized, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const authentication = req.headers.authorization;
            const bearerToken = authentication && authentication.split('Bearer ')[1];
            if (!bearerToken) {
                const responseError = ResponseHandler.Unauthorized();
                return res.status(responseError.status).json(responseError);
            }
            const verify = Authentication.jwtHelper.verifyToken(bearerToken) as IPayloadToken | null;
            if (!verify || !verify.roles?.includes(EnumUserRole.ROOT_ADMIN)) {
                const responseError = ResponseHandler.ForbiddenAccess();
                return res.status(responseError.status).json(responseError);
            }
            req.user = verify;
            next();
        } catch (error: any) {
            console.log(error);
            const responseError = ResponseHandler.InternalServer();
            return res.status(responseError.status).json(responseError);
        }
    }
}
