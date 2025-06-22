import { v4 as uuidv4 } from "uuid";

import {
  BillingInterval,
  CreateMembershipParams,
  Membership,
  MembershipPeriod,
  MembershipPeriodState,
  MembershipState,
} from "../types/membership.types";

interface MembershipDates {
  validFromDate: Date;
  validUntilDate: Date;
}

export const generateMembershipDates = ({
  billingInterval,
  billingPeriods,
  validFrom,
}: {
  billingInterval: BillingInterval;
  billingPeriods: number;
  validFrom?: string;
}): MembershipDates => {
  const validFromDate = validFrom ? new Date(validFrom) : new Date();
  const validUntilDate = new Date(validFromDate);

  if (billingInterval === BillingInterval.MONTHLY) {
    validUntilDate.setMonth(validFromDate.getMonth() + billingPeriods);
  } else if (billingInterval === BillingInterval.YEARLY) {
    validUntilDate.setFullYear(validFromDate.getFullYear() + billingPeriods);
  } else if (billingInterval === BillingInterval.WEEKLY) {
    validUntilDate.setDate(validFromDate.getDate() + billingPeriods * 7);
  }
  return { validFromDate, validUntilDate };
};

export const generateState = ({
  validFromDate,
  validUntilDate,
}: MembershipDates): Membership["state"] => {
  let state: Membership["state"] = MembershipState.ACTIVE;
  const now = new Date();
  if (validFromDate > now) state = MembershipState.PENDING;
  if (validUntilDate < now) state = MembershipState.EXPIRED;

  return state;
};

export const generateMembershipPeriods = ({
  validFromDate,
  billingPeriods,
  billingInterval,
  membershipId,
}: {
  validFromDate: Date;
  billingPeriods: number;
  billingInterval: BillingInterval;
  membershipId: number;
}): MembershipPeriod[] => {
  const periods: MembershipPeriod[] = [];
  let periodStart = validFromDate;

  for (let i = 0; i < billingPeriods; i++) {
    const start = periodStart;
    const end = new Date(start);

    if (billingInterval === BillingInterval.MONTHLY)
      end.setMonth(start.getMonth() + 1);
    else if (billingInterval === BillingInterval.YEARLY)
      end.setFullYear(start.getFullYear() + 1);
    else if (billingInterval === BillingInterval.WEEKLY)
      end.setDate(start.getDate() + 7);

    periods.push({
      id: i + 1,
      uuid: uuidv4(),
      membership: membershipId,
      start: start.toISOString(),
      end: end.toISOString(),
      state: MembershipPeriodState.PLANNED,
    });

    periodStart = end;
  }

  return periods;
};
