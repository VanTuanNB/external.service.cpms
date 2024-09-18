import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICourseEntity } from '../entities/course.entity';
import courseRequirementSchema from './course-requirement.schema';
import facultySchema from './facultiy.schema';

const courseSchema = new Schema<ICourseEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        code: { type: String, required: true },
        durationStart: { type: String, required: true },
        durationEnd: { type: String, required: true },
        quantity: { type: Number, required: true },
        faculty: { type: String, required: true, ref: 'faculties' },
        requirements: [{ type: String, default: [], ref: 'course-requirements' }],
        // faq: [{ type: String, default: [], ref: 'faq' }],
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

(() => {
    try {
        courseSchema.post('save', async function (doc: ICourseEntity & { _id: string }) {
            await facultySchema.updateOne({ _id: doc.faculty }, { $addToSet: { courses: doc._id } });
            if (!doc.requirements || !doc.requirements.length) return;
            const requirements = await courseRequirementSchema.find({ _id: { $in: doc.requirements } });
            if (!requirements || !requirements.length) return;
            const requirementIds = requirements.map((requirement) => requirement.id);
            await courseRequirementSchema.updateMany({ _id: requirementIds }, { $set: { course: doc._id } });
        });

        courseSchema.post('findOneAndUpdate', async function (doc: ICourseEntity & { _id: string }) {
            await facultySchema.updateMany({ _id: { $nin: doc.faculty } }, { $pull: { courses: doc._id } });
            await facultySchema.updateOne({ _id: doc.faculty }, { $addToSet: { courses: doc._id } });
            if (!doc.requirements || !doc.requirements.length) return;
            await courseRequirementSchema.updateMany(
                { course: doc._id, _id: { $nin: doc.requirements } },
                { $set: { course: '' } },
            );
            await courseRequirementSchema.updateMany({ _id: doc.requirements }, { $set: { course: doc._id } });
        });

        courseSchema.post('findOneAndDelete', async function (doc: ICourseEntity & { _id: string }) {
            await facultySchema.updateOne({ _id: doc.faculty }, { $pull: { courses: doc._id } });
            await courseRequirementSchema.updateMany({ course: doc._id }, { $set: { course: '' } });
        });
    } catch (error) {
        console.log('error', error);
    }
})();
export default mongoose.model<ICourseEntity & { _id: string }>('courses', courseSchema);
