import { Request, Response, NextFunction } from "express";
import { CreateMembershipParams } from "../types/membership.types";

export const validateMembership = (
  req: Request<{}, {}, CreateMembershipParams>,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    recurringPrice,
    billingPeriods,
    billingInterval,
    paymentMethod,
  } = req.body;

  if (!name || !recurringPrice) {
    return res.status(400).json({ message: "missingMandatoryFields" });
  }

  if (recurringPrice < 0) {
    return res.status(400).json({ message: "negativeRecurringPrice" });
  }

  if (recurringPrice > 100 && paymentMethod === "cash") {
    return res.status(400).json({ message: "cashPriceBelow100" });
  }

  if (billingInterval === "monthly") {
    if (billingPeriods > 12) {
      return res
        .status(400)
        .json({ message: "billingPeriodsMoreThan12Months" });
    }
    if (billingPeriods < 6) {
      return res.status(400).json({ message: "billingPeriodsLessThan6Months" });
    }
  } else if (billingInterval === "yearly") {
    if (billingPeriods > 10) {
      return res.status(400).json({ message: "billingPeriodsMoreThan10Years" });
    }
    if (billingPeriods < 3) {
      return res.status(400).json({ message: "billingPeriodsLessThan3Years" });
    }
  } else {
    return res.status(400).json({ message: "invalidBillingPeriods" });
  }

  next();
};
