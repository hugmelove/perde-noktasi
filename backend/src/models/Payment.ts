import mongoose, { Document, Schema } from 'mongoose';
import { PaymentType } from '../types';

export interface IPaymentDocument extends Document {
  orderId: mongoose.Types.ObjectId;
  dealerId: mongoose.Types.ObjectId;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: string;
  paymentDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPaymentDocument>({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  dealerId: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: Object.values(PaymentType),
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  notes: String
}, { timestamps: true });

export const Payment = mongoose.model<IPaymentDocument>('Payment', paymentSchema);
