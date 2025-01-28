import { useEffect, useState } from "react"
import WorkLogs from "../Components/WorkLogs"
import { useParams } from "react-router-dom"

const WorkLogList = () => {
    const [employee, setEmployee] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            const fetchEmployee = async (id) => {
              const response = await fetch(`/api/employees/${id}`);
              const employeeData = await response.json();

              setEmployee(employeeData);
            };

            fetchEmployee(id);    
        }
    }, [id])

    return (
        employee && <WorkLogs employee={ employee} />
    )
}

export default WorkLogList