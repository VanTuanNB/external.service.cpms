import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ICurriculumEntity } from '../entities/curriculum.entity';

const curriculumSchema = new Schema<ICurriculumEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        durationStart: { type: String, required: true },
        durationEnd: { type: String, required: true },
        code: { type: String, required: true },
        faculties: [{ type: String, default: [], ref: 'faculties' }],
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

curriculumSchema.post('findOneAndUpdate', async function (doc: ICurriculumEntity & { _id: string }) {
    const facultyModel = mongoose.model('faculties');
    await facultyModel.updateMany({ _id: doc.faculties }, { $set: { curriculum: doc._id } });
    await facultyModel.updateMany({ curriculum: doc._id, _id: { $nin: doc.faculties } }, { $set: { curriculum: '' } });
});

curriculumSchema.post('findOneAndDelete', async function (doc: ICurriculumEntity & { _id: string }) {
    const facultyModel = mongoose.model('faculties');
    await facultyModel.updateMany({ curriculum: doc._id }, { $set: { curriculum: '' } });
});
export default mongoose.model<ICurriculumEntity & { _id: string }>('curriculum', curriculumSchema);
