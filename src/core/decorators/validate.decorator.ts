import type { NextFunction, Request, Response } from 'express';
import type { ClassType } from '../@types';
import { ValidatorInput } from '../helpers/class-validator.helper';
export enum EModePayload {
    BODY = 'body',
    PARAMS = 'params',
    QUERY = 'query',
    HEADERS = 'headers',
}

const validatorInput = new ValidatorInput();

function Required<T>(model: ClassType<T>, modePayload: EModePayload = EModePayload.BODY) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originMethod = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const payload = req[modePayload];
            const modelInstance = new model(payload);
            const invalid = await validatorInput.validate(modelInstance);
            if (invalid) return res.status(invalid.status).json(invalid);
            return originMethod.apply(this, [req, res, next]);
        };
    };
}

export { Required };
