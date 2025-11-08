import { TulleType } from '../models/TulleType';
import { FoldType } from '../models/FoldType';
import { SunshadeType } from '../models/SunshadeType';

export class PricingService {
  static async calculateTullePrice(
    tulleTypeId: string,
    width: number,
    height: number,
    quantity: number,
    foldTypeId?: string
  ) {
    const tulleType = await TulleType.findById(tulleTypeId);
    if (!tulleType) throw new Error('Tulle type not found');

    const area = (width * height) / 10000; // m² cinsinden
    let price = tulleType.basePrice * area * quantity;

    if (foldTypeId) {
      const foldType = await FoldType.findById(foldTypeId);
      if (foldType) {
        price += foldType.pricePerMeter * height * quantity;
      }
    }

    return Math.round(price * 100) / 100;
  }

  static async calculateSunshadePrice(
    sunshadeTypeId: string,
    width: number,
    height: number,
    quantity: number
  ) {
    const sunshadeType = await SunshadeType.findById(sunshadeTypeId);
    if (!sunshadeType) throw new Error('Sunshade type not found');

    const area = (width * height) / 10000;
    const price = sunshadeType.basePrice * area * quantity;

    return Math.round(price * 100) / 100;
  }
}
