import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, setFilteredEmployees, setOrderBy }) => {

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
  
  return (
  <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level <input type="text" name="level" placeholder="filter by level" onChange={handleInput} /></th>
            <th>Position <input type="text" name="position" placeholder="filter by position" onChange={handleInput} /></th>
            <th>Order by:
              <select onChange={(e) => { setOrderBy(e.target.value) }}>
                <option>Select order</option>
                <option value="name">Name</option>
                <option value="first">First Name</option>
                <option value="last">Last Name</option>
                <option value="middle">Middle Name</option>
                <option value="position">Position</option>
                <option value="level">Level</option>
            </select></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
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
  )
};

export default EmployeeTable;
