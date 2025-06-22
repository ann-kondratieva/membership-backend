import { Request, Response } from "express";

import {
  CreateMembershipParams,
  Membership,
  MembershipPeriod,
} from "../types/membership.types";
import {
  createMembershipService,
  getMembershipsService,
} from "../services/membership.service";

interface CreateMembershipResponse {
  membership: Membership;
  membershipPeriods: MembershipPeriod[];
}

type GetMembershipsResponse = Array<{
  membership: Membership;
  periods: MembershipPeriod[];
}>;

export const createMembership = (
  req: Request<{}, CreateMembershipResponse, CreateMembershipParams>,
  res: Response
) => {
  const {
    name,
    recurringPrice,
    billingPeriods,
    billingInterval,
    paymentMethod,
    validFrom,
  } = req.body;

  const { membership, membershipPeriods } = createMembershipService({
    name,
    recurringPrice,
    billingPeriods,
    billingInterval,
    paymentMethod,
    validFrom,
  });

  res.status(201).json({ membership, membershipPeriods });
};

export const getMemberships = (
  req: Request<{}, GetMembershipsResponse, {}>,
  res: Response
) => {
  const memberships = getMembershipsService();

  res.status(200).json(memberships);
};
