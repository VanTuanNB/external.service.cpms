import type { IAdmissionsEntity } from '@/database/entities/admissions.entity';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

// Filter model for getting information about a specific admission
export class GetInfoAdmissionsFilterModel implements Partial<IAdmissionsEntity> {
    @IsUUID()
    @IsNotEmpty()
    id?: string;

    constructor(payload: Partial<IAdmissionsEntity>) {
        this.id = payload.id;
    }
}

// Interface for payload to get a list of admissions with pagination
export interface IPayloadGetListAdmissions {
    page: number;
    limit: number;
    keyword?: string;
}

// Filter model for getting a paginated list of admissions
export class GetPagingAdmissionsFilterModel implements Partial<IPayloadGetListAdmissions> {
    @IsString()
    @IsOptional()
    page?: number;

    @IsString()
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    keyword?: string;

    constructor(payload: Partial<IPayloadGetListAdmissions>) {
        this.page = payload.page;
        this.limit = payload.limit;
        this.keyword = payload.keyword;
    }
}

// Type for payload to create a new admission
export type IPayloadCreateAdmissions = Omit<IAdmissionsEntity, 'createdAt' | 'updatedAt'> & {};

// Filter model for creating a new admission
export class CreateAdmissionsFilterModel implements Partial<IPayloadCreateAdmissions> {
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsString()
    @IsNotEmpty()
    birthday?: string;

    constructor(payload: Partial<IPayloadCreateAdmissions>) {
        this.name = payload.name;
        this.email = payload.email;
        this.phone = payload.phone;
        this.address = payload.address;
        this.gender = payload.gender;
        this.birthday = payload.birthday;
    }
}

export class UpgradeToStudentAdmissionsFilterModel {
    @IsArray()
    @IsNotEmpty()
    admissionIds?: string;

    constructor(payload: any) {
        this.admissionIds = payload.admissionIds;
    }
}
