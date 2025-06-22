import { v4 as uuidv4 } from "uuid";

import { CreateMembershipParams, Membership } from "../types/membership.types";
import memberships from "../../data/memberships.json";
import membershipPeriodsData from "../../data/membership-periods.json";
import {
  generateMembershipDates,
  generateMembershipPeriods,
  generateState,
} from "../utils/membership";

export const createMembershipService = (
  membershipParams: CreateMembershipParams
) => {
  const userId = 2000;

  const { validFromDate, validUntilDate } = generateMembershipDates({
    billingInterval: membershipParams.billingInterval,
    billingPeriods: membershipParams.billingPeriods,
    validFrom: membershipParams.validFrom,
  });

  const state = generateState({
    validFromDate,
    validUntilDate,
  });

  const newMembership: Membership = {
    id: memberships.length + 1,
    uuid: uuidv4(),
    name: membershipParams.name,
    state,
    validFrom: validFromDate.toISOString(),
    validUntil: validUntilDate.toISOString(),
    userId: userId,
    paymentMethod: membershipParams.paymentMethod,
    recurringPrice: membershipParams.recurringPrice,
    billingPeriods: membershipParams.billingPeriods,
    billingInterval: membershipParams.billingInterval,
    assignedBy: "Admin",
  };

  memberships.push(newMembership);

  const periods = generateMembershipPeriods({
    validFromDate,
    billingPeriods: membershipParams.billingPeriods,
    billingInterval: membershipParams.billingInterval,
    membershipId: newMembership.id,
  });

  membershipPeriodsData.push(...periods);

  return { membership: newMembership, membershipPeriods: periods };
};

export const getMembershipsService = () => {
  const rows = memberships.map((membership) => {
    const periods = membershipPeriodsData.filter(
      (p) => p.membership === membership.id
    );
    return { membership, periods };
  });

  return rows;
};
