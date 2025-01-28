import Employee from "./employee.model.js";

export async function getEmployees() {
    return await Employee.find().sort({ created: "desc" });
}

export async function getEmployeeById(id) {
    return await Employee.findById(id);
}

export async function getEmployeeByName(name) {
    return await Employee.find({name: {$regex: `^${name}`, $options: "i"}})
}

export async function getEmployeesByParam(param = {}) {
    return await Employee.find({ ...param }).sort({created: "desc"})
}

export async function saveEmployee(employee) {
    return await Employee.create(employee);
}

export async function updateEmployee(id, data) {
    return await Employee.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true }
    );
}

export async function deleteEmployee(id) {
    return await Employee.findByIdAndDelete(id)
}

//instead fetching from the frontend by id
export async function getOwnedEquipments(employee) {
    const populatedEmployee = await employee.populate("equipments")
    return populatedEmployee.equipments;
}