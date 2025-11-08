import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Payment } from '../models/Payment';
import { Order } from '../models/Order';
import { Dealer } from '../models/Dealer';

export const getPayments = async (req: AuthRequest, res: Response) => {
  try {
    const query: any = {};
    
    if (req.user.role === 'dealer') {
      const dealer = await Dealer.findOne({ userId: req.user._id });
      if (dealer) {
        query.dealerId = dealer._id;
      }
    }

    const payments = await Payment.find(query)
      .populate('orderId')
      .populate('dealerId')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: payments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, amount, paymentMethod, notes } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (amount > order.remainingAmount) {
      return res.status(400).json({ success: false, message: 'Payment amount exceeds remaining amount' });
    }

    const payment = new Payment({
      orderId,
      dealerId: order.dealerId,
      amount,
      paymentType: 'payment',
      paymentMethod,
      notes
    });

    await payment.save();

    order.paidAmount += amount;
    order.remainingAmount -= amount;
    await order.save();

    res.status(201).json({ success: true, data: payment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
