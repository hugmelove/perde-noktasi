import mongoose, { Document, Schema } from 'mongoose';
import { OrderStatus } from '../types';

export interface IOrderDocument extends Document {
  orderNumber: string;
  dealerId: mongoose.Types.ObjectId;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    productType: string;
    tulleType?: mongoose.Types.ObjectId;
    foldType?: mongoose.Types.ObjectId;
    sunshadeType?: mongoose.Types.ObjectId;
    width: number;
    height: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    specifications: any;
  }>;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: OrderStatus;
  notes?: string;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrderDocument>({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  dealerId: {
    type: Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  },
  items: [{
    productType: { type: String, required: true },
    tulleType: { type: Schema.Types.ObjectId, ref: 'TulleType' },
    foldType: { type: Schema.Types.ObjectId, ref: 'FoldType' },
    sunshadeType: { type: Schema.Types.ObjectId, ref: 'SunshadeType' },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    specifications: { type: Schema.Types.Mixed }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING
  },
  notes: String,
  deliveryDate: Date
}, { timestamps: true });

export const Order = mongoose.model<IOrderDocument>('Order', orderSchema);
