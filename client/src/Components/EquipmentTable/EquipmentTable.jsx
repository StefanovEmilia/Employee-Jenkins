import { Link } from "react-router-dom";
import "../EmployeeTable/EmployeeTable.css";
import { useState } from "react";
import ConfirmPopup from "../ConfirmPopup";

const EquipmentTable = ({ equipments, onDelete, }) => {
  const [deleteEquipment, setDeleteEquipment] = useState(null)

  return (
    <>
      {deleteEquipment && <ConfirmPopup onDelete={deleteEquipment.onDelete} id={deleteEquipment.id } setDeleteEquipment={setDeleteEquipment}/>}
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Amount</th>
              <th></th>
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
                  <button type="button" onClick={() => setDeleteEquipment({onDelete:onDelete, id:equipment._id})}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EquipmentTable