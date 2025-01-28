import express from "express"
import * as equipmetQueries from "../db/equipment.queries.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const equipments = await equipmetQueries.getEquipments()
        res.json(equipments)
    } catch (err) {
        errorCase(req, err, next)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const equipment = await equipmetQueries.getEquipmentByID(req.params.id)
        res.json(equipment)
    } catch (err) {
        errorCase(req, err, next)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const created = await equipmetQueries.createEquipment(req.body)
        res.json(created)
    } catch (err) {
        errorCase(req, err, next)
    }
})

router.patch("/:id", async (req, res, next) => {
    try {
        const updated = await equipmetQueries.updateEquipment(req.params.id, req.body)
        res.json(updated)
    } catch (err) {
        errorCase(req, err, next)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await equipmetQueries.deleteEquipment(req.params.id)
        res.json(deleted)
    } catch (err) {
        errorCase(req, err, next)
    }
})

router.use("*", (req, res) => {
  console.log(req.errorMessage.error);
  res.json({ error: req.errorMessage.message });
});

function errorCase(req, err, next) {
    req.errorMessage = {
      message: "Something went wrong on the server side! Try again later!",
      error: err,
    };
    next();
}

export default router;