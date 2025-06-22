import express from "express";

import { validateMembership } from "../middlewares/validateMembership";
import {
  createMembership,
  getMemberships,
} from "../controllers/membership.controller";

const router = express.Router();

router.get("/", getMemberships);

router.post("/", validateMembership, createMembership);

export default router;
