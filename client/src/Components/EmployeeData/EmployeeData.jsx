import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
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
      <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Equipments</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
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
              </td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default EmployeeData