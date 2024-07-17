import Employee from "./employee.model.js";

export async function getEmployees() {
    return await Employee.find().sort({ created: "desc" });
}

export async function getEmployeeById(id) {
    return await Employee.findById(id);
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