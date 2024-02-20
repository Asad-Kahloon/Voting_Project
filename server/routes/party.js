import express from "express";
import { Party } from "../models/Party.js";
import { verifySuperAdmin } from "./auth.js";

const router = express.Router();

router.get("/view", async (req, res) => {
  try {
    const parties = await Party.find();
    return res.json(parties);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/add", verifySuperAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const pname = await Party.findOne({ name });
    if (pname) {
      res.json({ message: "party already added" });
    } else {
      const newparty = new Party({
        name,
      });
      await newparty.save();
      return res.json({ party_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Adding Party" });
  }
});

export { router as PartyRouter };
