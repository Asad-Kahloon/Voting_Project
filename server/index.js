import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { SuperAdminRouter } from "./routes/auth.js";
import { SubAdminRouter } from "./routes/subadmin.js";
import { VoterRouter } from "./routes/voter.js";
import { CandidateRouter } from "./routes/candidate.js";
import { ElectionRouter } from "./routes/election.js";
import { ProvinceRouter } from "./routes/province.js";
import { DistrictRouter } from "./routes/district.js";
import { ConstituencyRouter } from "./routes/constituency.js";
import { CategoryRouter } from "./routes/category.js";

import "./db.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", SuperAdminRouter);
app.use("/subadmin", SubAdminRouter);
app.use("/election", ElectionRouter);
app.use("/province", ProvinceRouter);
app.use("/district", DistrictRouter);
app.use("/constituency", ConstituencyRouter);
app.use("/category", CategoryRouter);
app.use("/voter", VoterRouter);
app.use("/candidate", CandidateRouter);

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
