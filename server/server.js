//require("dotenv").config();
import express from "express";
import { connect } from "mongoose";
import employeeRoutes from "./routes/employee.route.js";
import equipmentRoutes from "./routes/equipment.routes.js"
import dotenv from "dotenv"

dotenv.config()

const { MONGO_URL, PORT = 8081 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/api/employees", employeeRoutes)
app.use("/api/equipments", equipmentRoutes)

const main = async () => {
  await connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8081");
    console.log("Try /api/employees route right now");
  });
};

main()
