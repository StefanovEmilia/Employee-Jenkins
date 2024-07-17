import * as eQueries from "../db/employee.queries.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const employees = await eQueries.getEmployees();
  return res.json(employees);
});

router.get("/superheroes", async (req, res) => {
    try {
        const superheroes = await eQueries.getEmployeesByParam({ position: "Superhero" })
        res.json(superheroes)
    } catch (err) {
        req.errorMessage = {
          message: "Something went wrong on the server side, try again later!",
          error: err,
        };
        next();
    } 
});

router.get("/:id", async (req, res, next) => {
    try {
        const employee = await eQueries.getEmployeeById(req.params.id);
        return res.json(employee);
    } catch (err) {
        req.errorMessage = {
            message: "Cannot find the id",
            error: err
        };
        next();
    }  
});

router.post("/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await eQueries.saveEmployee(employee);
    return res.json(saved);
  } catch (err) {
    req.errorMessage = {
      message: "Create a new Employee is failed!",
      error: err,
    };
    next();
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const employee = await eQueries.updateEmployee(req.params.id, req.body);
    res.json(employee);
  } catch (err) {
    req.errorMessage = {
      message: "Cannot find the id",
      error: err,
    };
    next();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await eQueries.deleteEmployee(req.params.id);
    return res.json(deleted);
  } catch (err) {
      req.errorMessage = {
        message: "Cannot find the id",
        error: err,
      };
      next();
  }
});

router.use("*", (req, res) => {
    console.log(req.errorMessage.error)
    res.json({error: req.errorMessage.message})
 })

export default router;
