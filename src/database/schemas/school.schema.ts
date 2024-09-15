import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { ISchoolEntity } from '../entities/school.entity';

const schoolSchema = new Schema<ISchoolEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        code: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        logoUrl: { type: String, default: '' },
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
schoolSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<ISchoolEntity & { _id: string }>('schools', schoolSchema);
