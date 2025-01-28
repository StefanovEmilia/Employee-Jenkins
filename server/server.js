//require("dotenv").config();
import express from "express";
import { connect } from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import employeeRoutes from "./routes/employee.route.js";
import equipmentRoutes from "./routes/equipment.routes.js"
import dotenv from "dotenv"

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { MONGO_URL, PORT = 8081 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/api/employees", employeeRoutes)
app.use("/api/equipments", equipmentRoutes)

const frontendBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(frontendBuildPath))

// React fallback for non-API routes
app.get("*", (req, res, next) => {
  // If the request is for an API route, skip this middleware
  if (req.path.startsWith("/api")) {
    return next();
  }

  // Serve React's index.html for all other routes
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

const main = async () => {
  await connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8081");
    console.log("Try /api/employees route right now");
  });
};

main()
