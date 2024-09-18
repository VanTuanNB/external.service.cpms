import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { INewsEntity } from '../entities/news.entity';

const newsSchema = new Schema<INewsEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        contents: { type: String, required: true },
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
newsSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<INewsEntity & { _id: string }>('news', newsSchema);
