import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { SuperAdmin } from "../models/SuperAdmin.js";
import { SubAdmin } from "../models/SubAdmin.js";
import { Voter } from "../models/Voter.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { cnic, password, role } = req.body;

  if (role === "superadmin") {
    const superadmin = await SuperAdmin.findOne({ cnic });
    if (!superadmin) {
      return res.json({ message: "Super Admin not found" });
    }
    const validPassword = await bcrypt.compare(password, superadmin.password);
    if (!validPassword) {
      return res.json({ message: "wrong password" });
    }
    const token = jwt.sign(
      { cnic: superadmin.cnic, role: "superadmin" },
      process.env.Super_Admin_Key
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.json({ login: true, role: "superadmin" });
  } else if (role === "voter") {
    const voter = await Voter.findOne({ cnic });
    if (!voter) {
      return res.json({ message: "voter not found" });
    }
    const validPassword = await bcrypt.compare(password, voter.password);
    if (!validPassword) {
      return res.json({ message: "wrong password" });
    }
    const token = jwt.sign(
      { cnic: voter.cnic, role: "voter" },
      process.env.Voter_Key
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.json({ login: true, role: "voter" });
  } else if (role === "subadmin") {
    const subadmin = await SubAdmin.findOne({ cnic });
    if (!subadmin) {
      return res.json({ message: "SubAdmin not found" });
    }
    const validPassword = await bcrypt.compare(password, subadmin.password);
    if (!validPassword) {
      return res.json({ message: "Wrong password" });
    }
    // Include province and district in the token payload
    const tokenPayload = {
      cnic: subadmin.cnic,
      role: "subadmin",
      province: subadmin.province,
      district: subadmin.district,
    };

    const token = jwt.sign(tokenPayload, process.env.Sub_Admin_Key, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.json({
      login: true,
      role: "subadmin",
      cnic: subadmin.cnic,
      token,
    });
  } else {
  }
});

const verifySuperAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Super Admin" });
  } else {
    jwt.verify(token, process.env.Super_Admin_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifySubAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Sub Admin" });
  } else {
    jwt.verify(token, process.env.Sub_Admin_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyVoter = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Voter" });
  } else {
    jwt.verify(token, process.env.Voter_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.Super_Admin_Key, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.Voter_Key, (err, decoded) => {
          if (err) {
            jwt.verify(token, process.env.Sub_Admin_Key, (err, decoded) => {
              if (err) {
                return res.json({ message: "Invalid Token" });
              } else {
                req.cnic = decoded.cnic;
                req.role = decoded.role;
                next();
              }
            });
          } else {
            req.cnic = decoded.cnic;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

export {
  router as SuperAdminRouter,
  verifySuperAdmin,
  verifySubAdmin,
  verifyVoter,
};
