import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICurriculumEntity } from '../entities/curriculum.entity';
import facultySchema from './facultiy.schema';

const curriculumSchema = new Schema<ICurriculumEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        durationStart: { type: String, required: true },
        durationEnd: { type: String, required: true },
        code: { type: String, required: true },
        faculties: [{ type: String, default: [], ref: 'faculties', unique: true }],
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
curriculumSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
(() => {
    try {
        curriculumSchema.post('save', async function (doc: ICurriculumEntity & { _id: string }) {
            if (!doc.faculties || !doc.faculties.length) return;
            const faculties = await facultySchema.find({ _id: { $in: doc.faculties } });
            if (!faculties || !faculties.length) return;
            const facultyIds = faculties.map((faculty) => faculty._id || faculty.id);
            await facultySchema.updateMany({ _id: facultyIds }, { $set: { curriculum: doc._id } });
        });

        curriculumSchema.post('findOneAndUpdate', async function (doc: ICurriculumEntity & { _id: string }) {
            await facultySchema.updateMany(
                { curriculum: doc._id, _id: { $nin: doc.faculties } },
                { $set: { curriculum: '' } },
            );
            await facultySchema.updateMany({ _id: doc.faculties }, { $set: { curriculum: doc._id } });
        });

        curriculumSchema.post('findOneAndDelete', async function (doc: ICurriculumEntity & { _id: string }) {
            await facultySchema.updateMany({ curriculum: doc._id }, { $set: { curriculum: '' } });
        });
    } catch (error) {
        console.log('error', error);
    }
})();

export default mongoose.model<ICurriculumEntity & { _id: string }>('curriculum', curriculumSchema);
