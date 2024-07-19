import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, setFilteredEmployees, setOrderBy, attended, setAttended, setMissings }) => {

  const handleInput = (e) => {
    if (e.target.value === '') {
      setFilteredEmployees(null)
      return
    }
    const filteredEmployees = employees.filter(employee => employee[e.target.name].toLowerCase().startsWith(e.target.value))
    if (filteredEmployees.length === 0) {
      setFilteredEmployees(null)
      return
    }
    setFilteredEmployees(filteredEmployees)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setAttended(prev => prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value])
    setMissings((prev) => prev.filter((id) => id !== value));
  }
  
  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              Level{" "}
              <input
                type="text"
                name="level"
                placeholder="filter by level"
                onChange={handleInput}
              />
            </th>
            <th>
              Position{" "}
              <input
                type="text"
                name="position"
                placeholder="filter by position"
                onChange={handleInput}
              />
            </th>
            <th>Attendance: <Link to="/missing"><button type="button">Who's missing?</button></Link></th>
            <th>
              Order by:
              <select
                onChange={(e) => {
                  setOrderBy(e.target.value);
                }}
              >
                <option>Select order</option>
                <option value="name">Name</option>
                <option value="first">First Name</option>
                <option value="last">Last Name</option>
                <option value="middle">Middle Name</option>
                <option value="position">Position</option>
                <option value="level">Level</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td><input type="checkbox" checked={attended?.includes(employee._id)} value={employee._id} onChange={ handleChange} /></td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
