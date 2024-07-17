// https://mongoosejs.com/
import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default model("Employee", EmployeeSchema);
