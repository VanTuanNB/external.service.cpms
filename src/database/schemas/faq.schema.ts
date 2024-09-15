import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IFaQEntity } from '../entities/faq.entity';

const faqSchema = new Schema<IFaQEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        courseId: { type: String, required: true, ref: 'courses' },
        options: [{ type: String, default: '' }],
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
faqSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<IFaQEntity & { _id: string }>('faq', faqSchema);
