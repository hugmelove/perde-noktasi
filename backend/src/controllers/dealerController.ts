import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Dealer } from '../models/Dealer';
import { User } from '../models/User';

export const getDealers = async (req: AuthRequest, res: Response) => {
  try {
    const dealers = await Dealer.find().populate('userId', 'name email');
    res.json({ success: true, data: dealers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDealer = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name, companyName, taxNumber, address, phone, city, district, creditLimit } = req.body;

    const user = new User({ email, password, name, role: 'dealer' });
    await user.save();

    const dealer = new Dealer({
      userId: user._id,
      companyName,
      taxNumber,
      address,
      phone,
      city,
      district,
      creditLimit: creditLimit || 0
    });
    await dealer.save();

    res.status(201).json({ success: true, data: dealer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDealer = async (req: AuthRequest, res: Response) => {
  try {
    const dealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }
    res.json({ success: true, data: dealer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDealer = async (req: AuthRequest, res: Response) => {
  try {
    const dealer = await Dealer.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }
    res.json({ success: true, data: dealer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
