import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICourseRequirementEntity } from '../entities/course-requirement.entity';
import courseSchema from './course.schema';

const courseRequirementSchema = new Schema<ICourseRequirementEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        code: { type: String, required: true },
        course: { type: String, required: true, ref: 'course' },
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
(() => {
    try {
        courseRequirementSchema.post('save', async function (doc: ICourseRequirementEntity & { _id: string }) {
            await courseSchema.updateOne({ _id: doc.course }, { $addToSet: { requirements: doc._id } });
        });

        courseRequirementSchema.post('findOneAndUpdate', async function (doc: ICourseRequirementEntity & { _id: string }) {
            await courseSchema.updateMany({ _id: { $nin: doc.course } }, { $pull: { requirements: doc._id } });
            await courseSchema.updateOne({ _id: doc.course }, { $addToSet: { requirements: doc._id } });
        });

        courseRequirementSchema.post('findOneAndDelete', async function (doc: ICourseRequirementEntity & { _id: string }) {
            await courseSchema.updateOne({ _id: doc.course }, { $pull: { requirements: doc._id } });
        });
    } catch (error) {
        console.log('error', error);
    }
})();
export default mongoose.model<ICourseRequirementEntity & { _id: string }>(
    'course-requirements',
    courseRequirementSchema,
);
