import mongoose from "mongoose"

const { Schema, model } = mongoose

const EquipmentSchema = new Schema({
    name: String,
    type: String,
    amount: Number
})

export default model("Equipment", EquipmentSchema)