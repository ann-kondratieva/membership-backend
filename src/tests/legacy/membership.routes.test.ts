import request from "supertest";
import app from "../../app";

describe("Membership routes", () => {
  describe("POST /memberships", () => {
    const validPayload = {
      name: "Premium Plan",
      user: 1,
      recurringPrice: 50,
      paymentMethod: "card",
      billingPeriods: 6,
      billingInterval: "monthly",
      validFrom: new Date().toISOString(),
      validUntil: new Date(
        new Date().setMonth(new Date().getMonth() + 6)
      ).toISOString(),
      state: "active",
    };

    it("creates a membership with valid data", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send(validPayload);
      expect(res.status).toBe(201);
      expect(res.body.membership).toHaveProperty("uuid");
      expect(res.body.membership).toHaveProperty("name", validPayload.name);
      expect(res.body.membershipPeriods).toHaveLength(6);
    });

    it("fails when name or recurringPrice is missing", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({ ...validPayload, name: undefined });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("missingMandatoryFields");
    });

    it("fails when recurringPrice is negative", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({ ...validPayload, recurringPrice: -5 });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("negativeRecurringPrice");
    });

    it("fails when recurringPrice > 100 and paymentMethod is cash", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({ ...validPayload, recurringPrice: 150, paymentMethod: "cash" });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("cashPriceBelow100");
    });

    it("fails when monthly billingPeriods > 12", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({ ...validPayload, billingPeriods: 13 });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("billingPeriodsMoreThan12Months");
    });

    it("fails when monthly billingPeriods < 6", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({ ...validPayload, billingPeriods: 3 });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("billingPeriodsLessThan6Months");
    });

    it("fails when yearly billingPeriods > 10", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({
          ...validPayload,
          billingInterval: "yearly",
          billingPeriods: 11,
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("billingPeriodsMoreThan10Years");
    });

    it("fails when yearly billingPeriods < 3", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({
          ...validPayload,
          billingInterval: "yearly",
          billingPeriods: 2,
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("billingPeriodsLessThan3Years");
    });

    it("fails with invalid billingInterval", async () => {
      const res = await request(app)
        .post("/legacy/memberships")
        .send({ ...validPayload, billingInterval: "daily" });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("invalidBillingPeriods");
    });
  });

  describe("GET /memberships", () => {
    it("returns an array of memberships", async () => {
      const res = await request(app).get("/legacy/memberships");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        for (const item of res.body) {
          expect(item).toHaveProperty("membership");
          expect(item).toHaveProperty("periods");
          expect(Array.isArray(item.periods)).toBe(true);
        }
      }
    });
  });
});
