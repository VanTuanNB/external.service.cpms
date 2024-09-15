import { ValidatorInput } from '@/core/helpers/class-validator.helper';
import { JWTHelper } from '@/core/helpers/jwt.helper';
import { ResponseHandler } from '@/core/helpers/response-handler.helper';
import type { IResponseServer } from '@/core/interfaces/common.interface';
import { UserModel, type IUserEntity } from '@/database/entities/user.entity';
import { RoleRepository } from '@/repositories/role.repository';
import { UserRepository } from '@/repositories/user.repository';
import bcrypt from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

export class AuthService {
    private userRepository = new UserRepository();
    private roleRepository = new RoleRepository();
    private jwtHelper = new JWTHelper();
    private validateInputService = new ValidatorInput();
    constructor() {}
    public async register(
        payload: Pick<IUserEntity, 'email' | 'password' | 'name' | 'birthday' | 'phone' | 'address'>,
    ): Promise<IResponseServer> {
        try {
            const account = await this.userRepository.checkUserExists(payload.email);
            if (account) {
                return new ResponseHandler(200, true, 'User exits', {
                    userId: account._id,
                });
            }
            const id = uuidV4();
            const hashPassword = await bcrypt.hash(payload.password, 10);
            const userRole = await this.roleRepository.getUserRoleRecord();
            if (!userRole) return ResponseHandler.InternalServer();
            const { accessToken, refreshToken } = this.jwtHelper.generatePairToken({
                id: id,
                email: payload.email,
                name: payload.name,
                role: userRole.role,
            });
            const newUser = new UserModel({
                id,
                email: payload.email.trim(),
                name: payload.name.trim(),
                birthday: payload.birthday,
                password: hashPassword,
                address: payload.address?.trim(),
                phone: payload.phone?.trim(),
                roles: [userRole.id],
                refreshToken,
            });
            const validation = await this.validateInputService.validate(newUser);
            if (validation) return validation;
            const newAccount = await this.userRepository.create(newUser);
            if (!newAccount) return new ResponseHandler(500, false, 'Can not create new account', null);
            return new ResponseHandler(201, true, 'Create new un verify account successfully', {
                accessToken,
                refreshToken,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }

    public async login(payload: Pick<IUserEntity, 'email' | 'password'>): Promise<IResponseServer> {
        try {
            const user = await this.userRepository.getByEmail(payload.email);
            if (!user)
                return new ResponseHandler(
                    404,
                    false,
                    'USER_NOT_FOUND',
                    null,
                    `The requested user with email "${payload.email}" dose not exist in the system.`,
                );
            const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
            if (!isPasswordMatched)
                return new ResponseHandler(401, false, 'Authentication Failed', null, `Incorrect email or password`);

            const { accessToken, refreshToken } = this.jwtHelper.generatePairToken({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.roles,
            });
            const updatedUser = await this.userRepository.update(Object.assign(user, { refreshToken }));
            if (!updatedUser) ResponseHandler.InternalServer();
            return new ResponseHandler(200, true, 'Login successfully', {
                accessToken,
                refreshToken,
            });
        } catch (error) {
            console.log('error', error);
            return ResponseHandler.InternalServer();
        }
    }
}
