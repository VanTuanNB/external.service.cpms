import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IAdmissionsEntity } from '../entities/admissions.entity';

const admissionSchema = new Schema<IAdmissionsEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String, default: 'other' },
        address: { type: String, required: true },
        birthday: { type: String, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
admissionSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<IAdmissionsEntity & { _id: string }>('admissions', admissionSchema);
