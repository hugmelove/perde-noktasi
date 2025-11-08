import mongoose, { Document, Schema } from 'mongoose';

export interface ISunshadeTypeDocument extends Document {
  name: string;
  code: string;
  basePrice: number;
  features: string[];
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sunshadeTypeSchema = new Schema<ISunshadeTypeDocument>({
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
  features: [String],
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const SunshadeType = mongoose.model<ISunshadeTypeDocument>('SunshadeType', sunshadeTypeSchema);
