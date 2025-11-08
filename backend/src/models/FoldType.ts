import mongoose, { Document, Schema } from 'mongoose';

export interface IFoldTypeDocument extends Document {
  name: string;
  code: string;
  pricePerMeter: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const foldTypeSchema = new Schema<IFoldTypeDocument>({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  pricePerMeter: {
    type: Number,
    required: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const FoldType = mongoose.model<IFoldTypeDocument>('FoldType', foldTypeSchema);
