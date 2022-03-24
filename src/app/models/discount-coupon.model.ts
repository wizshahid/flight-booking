export interface DiscountCouponModel {
  id: string;
  couponCode: string;
  validUpto: Date;
  discountPercent: number;
}
