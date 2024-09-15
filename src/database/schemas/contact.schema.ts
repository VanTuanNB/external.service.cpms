import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IContactEntity } from '../entities/contact.entity';

const contactSchema = new Schema<IContactEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        department: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
contactSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<IContactEntity & { _id: string }>('contact', contactSchema);
