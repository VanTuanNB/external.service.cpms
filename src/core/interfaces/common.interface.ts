import type { Request } from 'express';
import type { RootFilterQuery, UpdateQuery } from 'mongoose';

export interface IResponseServer<T = any> {
    isSuccess: boolean;
    status: number;
    data: T;
    message: string;
    version: string;
}

export type IMessageError = {
    field: string;
    message: string;
};

export type TypeOptionUpdateRecord<T = any> = {
    updateCondition: RootFilterQuery<T & { _id: string }>;
    updateQuery: UpdateQuery<T & { _id: string }>;
};

export interface IPayloadToken {
    id: string;
    name: string;
    roles: number[];
    email: number;
}

export interface RequestAuthorized extends Request {
    user?: IPayloadToken;
}
