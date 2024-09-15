import { EnumUserRole } from '@/core/constants/common.constant';
import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IUserEntity } from '../entities/user.entity';

const userSchema = new Schema<IUserEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        birthday: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        name: { type: String, required: true },
        roles: [{ type: String, required: true, default: EnumUserRole.USER, ref: 'roles' }],
        courses: [{ type: String, default: [], ref: 'courses' }],
        coursesRegistering: [{ type: String, default: [], ref: 'courses-registering' }],
        refreshToken: { type: String, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.id = user._id;
    delete user._id;
    return user;
};
export default mongoose.model<IUserEntity & { _id: string }>('user', userSchema);
