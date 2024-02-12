import mongoose from "mongoose";

const subadminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  role: {
    type: String,
  },
});

const subadminModel = mongoose.model("SubAdmin", subadminSchema);
export { subadminModel as SubAdmin };
