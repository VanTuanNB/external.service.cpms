import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { RoleModel, type IRoleEntity } from '@/database/entities/role.entity';
import { RoleRepository } from '@/repositories/role.repository';
import { v4 as uuidV4 } from 'uuid';

export class RoleService {
    private roleRepository = new RoleRepository();
    private validateInputService = new ValidatorInput();
    constructor() {}
    public async create(payload: Pick<IRoleEntity, 'title' | 'description' | 'role'>): Promise<IResponseServer> {
        try {
            const roleRecord = await this.roleRepository.getRoleRecord(payload.role);
            if (roleRecord) {
                return new ResponseHandler(200, true, 'Role is exits', {
                    title: roleRecord.title,
                    description: roleRecord.description,
                    role: roleRecord.role,
                });
            }
            const id = uuidV4();
            const newRole = new RoleModel({
                id,
                role: payload.role,
                title: payload.title.trim(),
                description: payload.description?.trim(),
            });
            const validation = await this.validateInputService.validate(newRole);
            if (validation) return validation;
            const newRoleRecord = await this.roleRepository.create(newRole);
            if (!newRoleRecord) return new ResponseHandler(500, false, 'Can not create new account', null);
            return new ResponseHandler(201, true, 'Create new role successfully', {
                title: newRoleRecord.title,
                description: newRoleRecord.description,
                role: newRoleRecord.role,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
