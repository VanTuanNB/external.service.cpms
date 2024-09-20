import { EnumUserCourseStatus } from '@/core/constants/common.constant';
import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IUserCourseEntity } from '../entities/user-course.entity';

const userCourseSchema = new Schema<IUserCourseEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        user: { type: String, required: true, ref: 'users' },
        course: { type: String, required: true, ref: 'courses' },
        status: { type: Number, required: true, default: EnumUserCourseStatus.PROCESSING },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
userCourseSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<IUserCourseEntity & { _id: string }>('user-courses', userCourseSchema);
