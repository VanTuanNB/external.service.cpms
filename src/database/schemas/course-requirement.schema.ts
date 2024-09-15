import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICourseRequirementEntity } from '../entities/course-requirement.entity';

const courseRequirementSchema = new Schema<ICourseRequirementEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
courseRequirementSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<ICourseRequirementEntity & { _id: string }>(
    'course-requirements',
    courseRequirementSchema,
);
