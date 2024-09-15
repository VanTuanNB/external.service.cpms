import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IFacultyEntity } from '../entities/faculty.entity';

const facultySchema = new Schema<IFacultyEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        curriculum: { type: String, required: true, ref: 'curriculum' },
        durationStart: { type: String, required: true },
        durationEnd: { type: String, required: true },
        code: { type: String, required: true },
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
facultySchema.post('save', async function (doc) {
    await mongoose.model('curriculum').updateOne({ _id: doc.curriculum }, { $addToSet: { faculties: doc._id } });
});

facultySchema.post('findOneAndUpdate', async function (doc) {
    console.log('doc', doc);
    await mongoose.model('curriculum').updateOne({ _id: doc.curriculum }, { $pull: { faculties: doc._id } });
});

facultySchema.post('findOneAndDelete', async function (doc) {
    await mongoose.model('curriculum').updateOne({ _id: doc.curriculum }, { $pull: { faculties: doc._id } });
});
export default mongoose.model<IFacultyEntity & { _id: string }>('faculties', facultySchema);
