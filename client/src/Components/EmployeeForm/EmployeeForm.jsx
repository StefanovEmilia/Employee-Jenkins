import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, eqlist }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipments, setEquipments] = useState(employee?.equipments ?? [])

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipments
      });
    }

    return onSave({
      name,
      level,
      position,
      equipments
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

      <div className="control">
        {eqlist.map((eq) => (
          <div key={eq._id}>
            <label htmlFor={eq._id}>{eq.name}</label>
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
