import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Order } from '../models/Order';
import { Dealer } from '../models/Dealer';
import { PricingService } from '../services/PricingService';

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const query: any = {};
    
    if (req.user.role === 'dealer') {
      const dealer = await Dealer.findOne({ userId: req.user._id });
      if (dealer) {
        query.dealerId = dealer._id;
      }
    }

    const orders = await Order.find(query)
      .populate('dealerId')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { customerName, customerPhone, customerAddress, items, notes } = req.body;

    const dealer = await Dealer.findOne({ userId: req.user._id });
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }

    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      let price = 0;

      if (item.productType === 'tulle') {
        price = await PricingService.calculateTullePrice(
          item.tulleType,
          item.width,
          item.height,
          item.quantity,
          item.foldType
        );
      } else if (item.productType === 'sunshade') {
        price = await PricingService.calculateSunshadePrice(
          item.sunshadeType,
          item.width,
          item.height,
          item.quantity
        );
      }

      processedItems.push({
        ...item,
        unitPrice: price / item.quantity,
        totalPrice: price
      });

      totalAmount += price;
    }

    const orderCount = await Order.countDocuments();
    const orderNumber = `ORD${String(orderCount + 1).padStart(6, '0')}`;

    const order = new Order({
      orderNumber,
      dealerId: dealer._id,
      customerName,
      customerPhone,
      customerAddress,
      items: processedItems,
      totalAmount,
      remainingAmount: totalAmount,
      notes
    });

    await order.save();

    res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
