import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ISchoolEntity {
    id: string;
    title: string;
    code: string;
    address: string;
    email: string;
    phone: string;
    logoUrl?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class SchoolModel implements ISchoolEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @IsOptional()
    logoUrl?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: ISchoolEntity) {
        this.id = params.id;
        this.title = params.title;
        this.code = params.code;
        this.address = params.address;
        this.phone = params.phone;
        this.email = params.email;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
