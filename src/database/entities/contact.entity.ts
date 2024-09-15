import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export interface IContactEntity {
    id: string;
    department: string;
    email: string;
    phone: string;
    message: string;
    createdAt?: string;
    updatedAt?: string;
}

export class ContactModel implements IContactEntity {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    createdAt?: string;

    @IsString()
    @IsNotEmpty()
    updatedAt?: string;

    constructor(param: IContactEntity) {
        this.id = param.id;
        this.department = param.department;
        this.phone = param.phone;
        this.email = param.email;
        this.message = param.message;
        this.createdAt = param.createdAt;
        this.updatedAt = param.updatedAt;
    }
}
