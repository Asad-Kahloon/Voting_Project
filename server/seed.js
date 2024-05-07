import bcrypt from "bcrypt";
import { SuperAdmin } from "./models/SuperAdmin.js";
import "./db.js";

async function AdminAccount() {
  try {
    const superadminCount = await SuperAdmin.countDocuments();
    if (superadminCount === 0) {
      const hashPassword = await bcrypt.hash("1234", 10);
      const newSuperAdmin = new SuperAdmin({
        cnic: "509",
        password: hashPassword,
      });
      await newSuperAdmin.save();
      console.log("Super Admin Created");
    } else {
      console.log("There is already a Super Admin");
    }
  } catch (error) {
    console.log(error);
  }
}

AdminAccount();
