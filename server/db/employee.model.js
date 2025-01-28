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
  equipments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Equipment",
    },
  ],
  worklog: []
});

export default model("Employee", EmployeeSchema);
