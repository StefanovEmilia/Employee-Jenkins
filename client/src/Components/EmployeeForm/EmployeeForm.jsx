import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, eqlist }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipments, setEquipments] = useState(employee?.equipments ?? [])
  const [worklogs, setWorklogs] = useState(employee?.worklog ?? [])
  const [workingHours, setWorkingHours] = useState(null)
  const [label, setLabel] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipments,
        worklog: [
          ...employee.worklog,
          { workinghours: workingHours, workingLabel: label },
        ],
      });
    }

    return onSave({
      name,
      level,
      position,
      equipments,
      worklog: [{ workinghours: workingHours, workingLabel: label }],
    });
  };

  const handleEquipmentChange = (e) => {
    const value = e.target.value;
    setEquipments((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div>
        <label>Add a worklog!</label>
        <label htmlFor="hours">Working hours:</label>
        <input
          id="hours"
          type="number"
          onChange={(e) => {
            setWorkingHours(e.target.value);
          }}
        />
        <label htmlFor="label">Working label:</label>
        <input
          id="label"
          type="text"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
      </div>

      <div className="control">
        {eqlist.map((eq) => (
          <div key={eq._id}>
            <label htmlFor={eq._id}>
              {eq.name} ({eq.type})
            </label>
            <input
              value={eq._id}
              onChange={handleEquipmentChange}
              name={eq.name}
              id={eq._id}
              type="checkbox"
              checked={equipments.includes(eq._id)}
            />
          </div>
        ))}
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
