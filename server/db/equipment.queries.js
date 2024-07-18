import Equipment from "./equipment.model.js"

export async function getEquipments() {
    return await Equipment.find({})
}

export async function updateEquipment(id, data) {
  return await Equipment.findOneAndUpdate(
    { _id: id },
    { $set: { ...data } },
    { new: true }
  );
}

export async function deleteEquipment(id) {
  return await Equipment.findByIdAndDelete(id)
}

