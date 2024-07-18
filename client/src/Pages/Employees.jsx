import { Link, useParams } from "react-router-dom";
import EmployeeData from "../Components/EmployeeData";
import ErrorPage from "./ErrorPage";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";



const Employees = () => {
    const [employees, setEmployees] = useState(null)
    const [employeeLoading, setEmployeeLoading] = useState(true);
    const {search} = useParams()

    useEffect(() => {
        const fetchEmployees = async (search) => {
          const response = await fetch(`/api/employees/${search}`);
            const employees = await response.json()
            console.log(employees)
            setEmployees(employees)
            setEmployeeLoading(false)
        };
        setEmployeeLoading(true)
        fetchEmployees(search)
        console.log(employees && Array.isArray(employees))
    }, [])

    if (employeeLoading) {
        return (<Loading/>)
    }

    return (
      <div>
        <div class="employees">
          {employees && Array.isArray(employees) ? (
            employees.map((employee) => <EmployeeData employee={employee} />)
          ) : (
            <ErrorPage search={search} />
          )}
        </div>
      </div>
    );
}

export default Employees