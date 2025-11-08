export enum UserRole {
  ADMIN = 'admin',
  DEALER = 'dealer'
}

export enum OrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  IN_PRODUCTION = 'in_production',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum PaymentType {
  ORDER = 'order',
  PAYMENT = 'payment'
}
