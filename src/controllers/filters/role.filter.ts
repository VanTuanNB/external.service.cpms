import { EnumUserRole } from '@/core/constants/common.constant';
import type { IRoleEntity } from '@/database/entities/role.entity';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleFilterModel implements Partial<IRoleEntity> {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsEnum(EnumUserRole)
    @IsNotEmpty()
    role?: number;

    @IsString()
    @IsOptional()
    description?: string;

    constructor(payload: Partial<IRoleEntity>) {
        this.title = payload.title;
        this.description = payload.description;
        this.role = payload.role;
    }
}
