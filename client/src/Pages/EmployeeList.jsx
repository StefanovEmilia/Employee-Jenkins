import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import TablePagination from "../Components/TablePagination";
import { useLocation } from "react-router-dom";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = ({attended, setAttended}) => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null)
  const [orderBy, setOrderBy] = useState(null)
  const [missings, setMissings] = useState([])
  const location = useLocation()
  const path = location.pathname

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleInput = (e) => {
    if (e.target.value === "") {
      setFilteredEmployees(null);
      return;
    }
    const filteredEmployees = employees.filter((employee) =>
      employee[e.target.name].toLowerCase().startsWith(e.target.value)
    );
    if (filteredEmployees.length === 0) {
      setFilteredEmployees(null);
      return;
    }
    setFilteredEmployees(filteredEmployees);
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, []);

  useEffect(() => {
    if (orderBy) {
      const list = filteredEmployees ? [...filteredEmployees] : [...employees];
      let ordered = [];

      if (orderBy === "first" || orderBy === "last" || orderBy === "middle") {
        if (orderBy === "first" || orderBy === "last") {
          ordered = list.sort((a, b) => {
            const indexA = orderBy === "first" ? 0 : a.name.split(" ").length - 1;
            const indexB = orderBy === "first" ? 0 : b.name.split(" ").length - 1;
            if (a.name.split(" ")[indexA] < b.name.split(" ")[indexB]) {
              return -1;
            }
            if (a.name.split(" ")[indexA] > b.name.split(" ")[indexB]) {
              return 1;
            }
            return 0;
          })
        } else {
          const middles = list.filter(employee => employee.name.split(' ').length > 2).sort((a, b) => {
            if (a.name.split(' ')[1] < b.name.split(' ')[1]) {
              return -1
            }
            if (a.name.split(' ')[1] > b.name.split(' ')[1]) {
              return 1
            }
            return 0
          })
          const normals = list.filter(employee => employee.name.split(' ').length === 2).sort((a, b) => {
            if (a.name < b.name) {
              return -1
            }
            if (a.name > b.name) {
              return 1
            }
            return 0
          })
          ordered = [...middles, ...normals]
          console.log(middles)
        }
      } else {
        ordered = list.sort((a, b) => {
          if (a[orderBy] < b[orderBy]) {
            return -1
          }
          if (a[orderBy] > b[orderBy]) {
            return 1
          }
          return 0
        })
      }
      
      if (filteredEmployees) {
        if (ordered.length > 0) {
          setFilteredEmployees(ordered);
        }
      } else {
        if (ordered.length > 0) {
          setEmployees(ordered);
        }
      }
    }
  }, [orderBy])

  useEffect(() => {
    console.log(path)
    if (path === "/missing") {
      const missingPeople = employees?.filter((employee) => !attended.includes(employee._id));
      setMissings(missingPeople);
    } else {
      setMissings([]);
    }
  }, [path, employees, attended])

  if (loading) {
    return <Loading />;
  }

  return ( 
    <TablePagination
      employees={path === "/missing" ? missings : filteredEmployees ? filteredEmployees : employees}
      onDelete={handleDelete}
      setOrderBy={setOrderBy}
      attended={attended}
      setAttended={setAttended}
      setMissings={setMissings}
      handleInput={handleInput}
    /> 
  );
};

export default EmployeeList;
