import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICourseEntity } from '../entities/course.entity';

const courseSchema = new Schema<ICourseEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        duration: { type: String, required: true },
        quantity: { type: Number, required: true },
        requirements: [{ type: String, default: [], ref: 'course-requirements' }],
        faq: [{ type: String, default: [], ref: 'faq' }],
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
courseSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<ICourseEntity & { _id: string }>('courses', courseSchema);
