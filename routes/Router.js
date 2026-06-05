import { Router } from "express";
import { getCountry } from "./getCountry";

const router = Router();

router.get("/country", getCountry);
router.post("/message", messageRoute);

export default router;
