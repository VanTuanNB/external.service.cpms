import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export interface IAdmissionsEntity {
    id: string;
    name: string;
    birthday: string;
    phone: string;
    address: string;
    email: string;
    gender?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class AdmissionsModel implements IAdmissionsEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    birthday: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(param: IAdmissionsEntity) {
        this.id = param.id;
        this.name = param.name;
        this.email = param.email;
        this.birthday = param.birthday;
        this.gender = param.gender;
        this.phone = param.phone;
        this.address = param.address;
        this.createdAt = param.createdAt;
        this.updatedAt = param.updatedAt;
    }
}
