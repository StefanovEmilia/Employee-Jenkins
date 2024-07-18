import { Link } from "react-router-dom";
import "../EmployeeTable/EmployeeTable.css";

const EquipmentTable = ({equipments, onDelete, }) => {
    return (
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Amount</th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment._id}>
                <td>{equipment.name}</td>
                <td>{equipment.type}</td>
                <td>{equipment.amount}</td>
                <td>
                  <Link to={`/equipments/update/${equipment._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(equipment._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default EquipmentTable