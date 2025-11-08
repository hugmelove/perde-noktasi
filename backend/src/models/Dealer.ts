import mongoose, { Document, Schema } from 'mongoose';

export interface IDealerDocument extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  taxNumber: string;
  address: string;
  phone: string;
  city: string;
  district: string;
  creditLimit: number;
  currentDebt: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dealerSchema = new Schema<IDealerDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  taxNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  creditLimit: {
    type: Number,
    default: 0
  },
  currentDebt: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const Dealer = mongoose.model<IDealerDocument>('Dealer', dealerSchema);
