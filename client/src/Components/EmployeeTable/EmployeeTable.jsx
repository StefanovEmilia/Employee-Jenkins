import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";
import ConfirmPopup from "../ConfirmPopup";

const EmployeeTable = ({ employees, onDelete, setOrderBy, attended, setAttended, setMissings, handleInput }) => {
  const [search, setSearch] = useState(null)
  const [deleteEmployee, setDeleteEmployee] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    setAttended(prev => prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value])
    setMissings((prev) => prev?.filter((id) => id !== value));
  }
  
  return (
    <>
      {deleteEmployee && (
        <ConfirmPopup
          onDelete={deleteEmployee.onDelete}
          id={deleteEmployee.id}
          setDeleteEmployee={setDeleteEmployee}
        />
      )}
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>
                Name
                <input
                  id="searchname"
                  type="text"
                  placeholder="Search by name"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Link to={"/employees/" + search}>
                  <button type="button">Search!</button>
                </Link>
              </th>
              <th>
                Level
                <input
                  type="text"
                  name="level"
                  placeholder="filter by level"
                  onChange={handleInput}
                />
              </th>
              <th>
                Position
                <input
                  type="text"
                  name="position"
                  placeholder="filter by position"
                  onChange={handleInput}
                />
              </th>
              <th>
                Attendance:{" "}
                <Link to="/missing">
                  <button type="button">Who's missing?</button>
                </Link>
              </th>
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
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attended?.includes(employee._id)}
                      value={employee._id}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteEmployee({
                          onDelete: onDelete,
                          id: employee._id,
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td>Cannot find anything!</td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeTable;
