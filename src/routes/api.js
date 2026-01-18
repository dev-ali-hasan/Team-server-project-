import express from "express";
import {
  getFrameworkFleetCart,
  getQuickQuestionFleetCart,
  postQuickQuestionFleetCart,
} from "../controllers/FleetCart.js";
import { getEnvaySoft, postEnvaySoft } from "../controllers/EnvaySoft.js";
import AccessChekc from "../middleware/accessCehck.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "success", data: "API is working" });
});



router.post("/quick-question", postQuickQuestionFleetCart);
router.get("/quick-question", AccessChekc, getQuickQuestionFleetCart);
router.get("/framework-count", AccessChekc, getFrameworkFleetCart);

router.post("/email", postEnvaySoft);
router.get("/email", AccessChekc, getEnvaySoft);

export default router;
