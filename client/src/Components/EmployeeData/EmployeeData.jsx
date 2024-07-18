import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./EmployeeData.css"
import Loading from "../Loading";

const EmployeeData = ({ employee }) => {
    const [equipments, setEquipments] = useState(null)
    const [equipmentLoading, setEquipmentLoading] = useState(false);

    useEffect(() => {
        const fetchEquipments = async () => {
            if (employee.equipments && employee.equipments.length > 0) {
            setEquipmentLoading(true)
            const equipmentPromises = employee.equipments.map(
              async (equipmentId) => {
                const response = await fetch(`/api/equipments/${equipmentId}`);
                return response.json();
              }
            );
            const fetchedEquipments = await Promise.all(equipmentPromises);
            setEquipments(fetchedEquipments);
            setEquipmentLoading(false)
          }
        };

        fetchEquipments()
    }, [])

    return (
      <div className="employeedata">
        <h1>{employee.name}</h1>
        <h3>
          {employee.level} {employee.position}
        </h3>
        <h3>Equipments:</h3>
        {equipmentLoading ? (
          <Loading />
        ) : equipments ? (
          equipments.map((equipment, index) => (
            <div key={index}>
              {equipment.name}: {equipment.type}
            </div>
          ))
        ) : (
          <div>No equipment</div>
        )}
        <Link to={`/update/${employee._id}`}>
          <button type="button">Update</button>
        </Link>
      </div>
    );
}

export default EmployeeData