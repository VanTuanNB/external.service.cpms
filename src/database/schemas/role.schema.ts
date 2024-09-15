import moment from 'moment-timezone';
import mongoose, { Schema } from 'mongoose';
import type { IRoleEntity } from '../entities/role.entity';

const roleSchema = new Schema<IRoleEntity & { _id: string }>(
    {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        role: { type: Number, required: true },
        description: { type: String, default: '' },
        createdAt: { type: String, default: moment().format() },
        updatedAt: { type: String, default: moment().format() },
    },
    {
        _id: false,
        timestamps: true,
    },
);
roleSchema.methods.toJSON = function () {
    const document = this.toObject();
    document.id = document._id;
    delete document._id;
    return document;
};
export default mongoose.model<IRoleEntity & { _id: string }>('roles', roleSchema);
