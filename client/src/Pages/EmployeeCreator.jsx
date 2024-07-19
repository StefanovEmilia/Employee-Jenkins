import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee) => {
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([])

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      const response = await fetch("/api/equipments");
      const equipments = await response.json();
      setEquipments(equipments);
    };
    fetchEquipments()
  }, [])

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      eqlist={equipments}
    />
  );
};

export default EmployeeCreator;
