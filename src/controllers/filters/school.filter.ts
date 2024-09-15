import type { ISchoolEntity } from '@/database/entities/school.entity';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetInfoSchoolFilterModel implements Partial<ISchoolEntity> {
    @IsString()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<ISchoolEntity>) {
        this.id = payload.id;
    }
}

export class CreateSchoolFilterModel implements Partial<ISchoolEntity> {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    code?: string;

    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    logoUrl?: string;

    constructor(payload: Partial<ISchoolEntity>) {
        this.title = payload.title;
        this.description = payload.description;
        this.code = payload.code;
        this.email = payload.email;
        this.phone = payload.phone;
        this.address = payload.address;
        this.logoUrl = payload.logoUrl;
    }
}
