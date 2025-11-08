import { Request, Response } from 'express';
import { TulleType } from '../models/TulleType';
import { FoldType } from '../models/FoldType';
import { SunshadeType } from '../models/SunshadeType';

export const getTulleTypes = async (req: Request, res: Response) => {
  try {
    const tulleTypes = await TulleType.find({ isActive: true });
    res.json({ success: true, data: tulleTypes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFoldTypes = async (req: Request, res: Response) => {
  try {
    const foldTypes = await FoldType.find({ isActive: true });
    res.json({ success: true, data: foldTypes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSunshadeTypes = async (req: Request, res: Response) => {
  try {
    const sunshadeTypes = await SunshadeType.find({ isActive: true });
    res.json({ success: true, data: sunshadeTypes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTulleType = async (req: Request, res: Response) => {
  try {
    const tulleType = new TulleType(req.body);
    await tulleType.save();
    res.status(201).json({ success: true, data: tulleType });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFoldType = async (req: Request, res: Response) => {
  try {
    const foldType = new FoldType(req.body);
    await foldType.save();
    res.status(201).json({ success: true, data: foldType });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSunshadeType = async (req: Request, res: Response) => {
  try {
    const sunshadeType = new SunshadeType(req.body);
    await sunshadeType.save();
    res.status(201).json({ success: true, data: sunshadeType });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
