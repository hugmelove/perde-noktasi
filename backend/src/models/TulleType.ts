import mongoose, { Document, Schema } from 'mongoose';

export interface ITulleTypeDocument extends Document {
  name: string;
  code: string;
  basePrice: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tulleTypeSchema = new Schema<ITulleTypeDocument>({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const TulleType = mongoose.model<ITulleTypeDocument>('TulleType', tulleTypeSchema);
