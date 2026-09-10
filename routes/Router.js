import express from "express";
import { getCountry } from "./getCountry.js";
import { sendMessage } from "./messageManager.js";
import { checkStatus } from "./checkStatus.js";
import { rememberVisitor } from "../middleware/rememberVisitor.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/country", rememberVisitor, getCountry);
router.get("/check", checkStatus);
router.post("/message", rateLimiter, sendMessage);

export default router;
