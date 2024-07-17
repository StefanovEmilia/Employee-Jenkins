/*
Loading the .env file and creates environment variables from it
*/
//require("dotenv").config();
import { connect, disconnect } from "mongoose";
import names from "./names.json" assert {type: "json"};
import levels from "./levels.json" assert { type: "json" };
import positions from "./positions.json" assert { type: "json" };
import EmployeeSchema from "../db/employee.model.js";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeSchema.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
  }));

  await EmployeeSchema.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await connect(mongoUrl);

  await populateEmployees();

  await disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
