import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICourseRegisteringEntity } from '../entities/course-register.entity';

const courseRegisteringSchema = new Schema<ICourseRegisteringEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        user: { type: String, required: true, ref: 'user' },
        course: { type: String, required: true, ref: 'course' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
courseRegisteringSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<ICourseRegisteringEntity & { _id: string }>(
    'courses-registering',
    courseRegisteringSchema,
);
