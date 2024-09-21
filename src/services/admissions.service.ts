import type { IPayloadCreateAdmissions } from '@/controllers/filters/admissions.filter';
import type { IPayloadGetListNews } from '@/controllers/filters/news.filter';
import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { JWTHelper } from '@/core/helpers/jwt.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer, QueryType } from '@/core/interfaces/common.interface';
import { AdmissionsModel } from '@/database/entities/admissions.entity';
import { UserModel } from '@/database/entities/user.entity';
import { AdmissionsRepository } from '@/repositories/admissions.repostiory';
import { RoleRepository } from '@/repositories/role.repository';
import { UserRepository } from '@/repositories/user.repository';
import bcrypt from 'bcryptjs';

import { v4 as uuidV4 } from 'uuid';

export class AdmissionsService {
    private userRepository = new UserRepository();
    private roleRepository = new RoleRepository();
    private admissionsRepository = new AdmissionsRepository();
    private validateInputService = new ValidatorInput();
    private jwtHelper = new JWTHelper();
    constructor() {}

    public async getList(payload: IPayloadGetListNews): Promise<IResponseServer> {
        try {
            const { page = 1, limit = 10, keyword } = payload;
            const skip = (page - 1) * limit;
            let query: QueryType = {};
            if (keyword) {
                query.$or = [
                    { email: { $regex: keyword, $options: 'i' } },
                    { name: { $regex: keyword, $options: 'i' } },
                    { phone: { $regex: keyword, $options: 'i' } },
                    { address: { $regex: keyword, $options: 'i' } },
                ];
            }
            const paging = {
                skip,
                limit,
                page,
            };
            const { items, totalItems } = await this.admissionsRepository.getList(query, paging);
            const totalPages = Math.ceil(totalItems / limit);

            return new ResponseHandler(200, true, 'Get List Admissions successfully', {
                items,
                totalItems,
                totalPages,
                page,
                limit,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async getById(id: string): Promise<IResponseServer> {
        try {
            const newsRecords = await this.admissionsRepository.getById(id);
            if (!newsRecords) return new ResponseHandler(404, false, 'Admissions not found', null);
            return new ResponseHandler(200, true, 'Get info Admissions successfully', newsRecords);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async create(payload: IPayloadCreateAdmissions): Promise<IResponseServer> {
        try {
            const adminRecord = await this.admissionsRepository.getByEmail(payload.email);
            if (adminRecord) {
                return new ResponseHandler(400, false, 'Email already exists', null);
            }
            const userRecord = await this.userRepository.getByEmail(payload.email);
            if (userRecord) {
                return new ResponseHandler(400, false, 'Email already exists', null);
            }
            const id = uuidV4();
            const newRecord = new AdmissionsModel({
                id,
                name: payload.name?.trim(),
                email: payload.email?.trim(),
                birthday: payload.birthday?.trim(),
                phone: payload.phone?.trim(),
                gender: payload.gender?.trim(),
                address: payload.address,
            });
            const validation = await this.validateInputService.validate(newRecord);
            if (validation) return validation;
            const newRecordCreated = await this.admissionsRepository.create(newRecord);
            if (!newRecordCreated) return new ResponseHandler(500, false, 'Can not create new Admissions', null);
            return new ResponseHandler(201, true, 'Create new Admissions successfully', newRecordCreated);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async upgradeToStudent(admissionIds: string[]): Promise<IResponseServer> {
        try {
            const newsRecords = await this.admissionsRepository.getMetadataManyRecordQuery({
                updateCondition: {
                    _id: { $in: admissionIds },
                },
                updateQuery: {},
            });
            if (!newsRecords || !newsRecords.length) {
                return new ResponseHandler(404, true, `Admissions with id ${admissionIds} not found`, null);
            }
            const userRole = await this.roleRepository.getUserRoleRecord();
            if (!userRole) return ResponseHandler.InternalServer();
            const userModels = await Promise.all(
                newsRecords.map(async (record) => {
                    const id = uuidV4();
                    const { accessToken, refreshToken } = this.jwtHelper.generatePairToken({
                        id: id,
                        email: record.email,
                        name: record.name,
                        roles: [userRole.role],
                    });
                    const hashPassword = await bcrypt.hash('123456789', 10);
                    return new UserModel({
                        id,
                        email: record.email,
                        name: record.name,
                        birthday: record.birthday,
                        password: hashPassword,
                        address: record?.address,
                        phone: record.phone,
                        roles: [userRole.id],
                        refreshToken,
                    });
                }),
            );
            const newAccounts = await this.userRepository.insertMultiple(userModels);
            if (!newAccounts) return new ResponseHandler(500, false, 'Can not create new account', null);
            await Promise.all(
                newsRecords.map(async (record) => {
                    await this.admissionsRepository.permanentlyDelete(record.id);
                }),
            );
            return new ResponseHandler(200, true, 'Upgrade to student successfully', null);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async permanentlyDelete(id: string): Promise<IResponseServer> {
        try {
            const facultyRecord = await this.admissionsRepository.permanentlyDelete(id);
            if (!facultyRecord) {
                return new ResponseHandler(404, false, `Admissions not found with id: ${id}`, null);
            }
            return new ResponseHandler(200, true, 'Deleted admissions successfully', facultyRecord);
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
