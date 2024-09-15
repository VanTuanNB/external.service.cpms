import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface IRoleEntity {
    id: string;
    title: string;
    role: number;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export class RoleModel implements IRoleEntity {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    role: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    createdAt?: string;

    @IsString()
    @IsOptional()
    updatedAt?: string;

    constructor(params: IRoleEntity) {
        this.id = params.id;
        this.title = params.title;
        this.role = params.role;
        this.description = params.description;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
