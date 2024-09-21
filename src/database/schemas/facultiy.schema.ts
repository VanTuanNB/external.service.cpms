import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IFacultyEntity } from '../entities/faculty.entity';
import courseSchema from './course.schema';
import curriculumSchema from './curriculum.schema';

const facultySchema = new Schema<IFacultyEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        curriculum: { type: String, required: true, ref: 'curriculum' },
        durationStart: { type: String, required: true },
        durationEnd: { type: String, required: true },
        code: { type: String, required: true },
        thumbnailUrl: { type: String, default: '' },
        courses: [{ type: String, default: [], ref: 'courses' }],
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
facultySchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
(() => {
    try {
        facultySchema.post('save', async function (doc: IFacultyEntity & { _id: string }) {
            await curriculumSchema.updateOne({ _id: doc.curriculum }, { $addToSet: { faculties: doc._id } });
            if (!doc.courses || !doc.courses.length) return;
            const courses = await courseSchema.find({ _id: { $in: doc.courses } });
            if (!courses || !courses.length) return;
            const facultyIds = courses.map((course) => course.id);
            await courseSchema.updateMany({ _id: facultyIds }, { $set: { curriculum: doc._id } });
        });

        facultySchema.post('findOneAndUpdate', async function (doc: IFacultyEntity & { _id: string }) {
            await curriculumSchema.updateMany({ _id: { $nin: doc.curriculum } }, { $pull: { faculties: doc._id } });
            await curriculumSchema.updateOne({ _id: doc.curriculum }, { $addToSet: { faculties: doc._id } });
            if (!doc.courses || !doc.courses.length) return;
            await courseSchema.updateMany({ faculty: doc._id, _id: { $nin: doc.courses } }, { $set: { faculty: '' } });
            await courseSchema.updateMany({ _id: doc.courses }, { $set: { faculty: doc._id } });
        });

        facultySchema.post('findOneAndDelete', async function (doc: IFacultyEntity & { _id: string }) {
            await curriculumSchema.updateOne({ _id: doc.curriculum }, { $pull: { faculties: doc._id } });
            await courseSchema.updateMany({ faculty: doc._id }, { $set: { faculty: '' } });
        });
    } catch (error) {
        console.log('error', error);
    }
})();

export default mongoose.model<IFacultyEntity & { _id: string }>('faculties', facultySchema);
