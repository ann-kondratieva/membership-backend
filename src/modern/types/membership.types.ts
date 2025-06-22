export enum BillingInterval {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  WEEKLY = "weekly",
}
export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
}

export enum MembershipState {
  ACTIVE = "active",
  PENDING = "pending",
  EXPIRED = "expired",
}

export interface Membership {
  id: number;
  uuid: string; // unique identifier for the membership
  name: string; // name of the membership
  userId: number; // the user that the membership is assigned to
  recurringPrice: number; // price the user has to pay for every period
  validFrom: string; // start of the validity
  validUntil: string; // end of the validity
  state: MembershipState; // indicates the state of the membership
  paymentMethod: PaymentMethod; // which payment method will be used to pay for the periods
  billingInterval: BillingInterval; // the interval unit of the periods
  billingPeriods: number; // the number of periods the membership has
  assignedBy: string;
}

export interface CreateMembershipParams {
  name: string;
  recurringPrice: number;
  billingPeriods: number;
  billingInterval: BillingInterval;
  paymentMethod: PaymentMethod;
  validFrom?: string;
}

export enum MembershipPeriodState {
  PLANNED = "planned",
  ACTIVE = "active",
  EXPIRED = "expired",
}

export interface MembershipPeriod {
  id: number;
  uuid: string; // unique identifier for the membership period
  membership: number; // membership the period is attached to
  start: string; // indicates the start of the period
  end: string; // indicates the end of the period
  state: MembershipPeriodState;
}
