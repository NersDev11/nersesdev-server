import { Router } from "express";
import { getCountry } from "./getCountry.js";
import { sendMessage } from "./messageManager.js";

const router = Router();

router.get("/country", getCountry);
router.post("/message", sendMessage);

export default router;
