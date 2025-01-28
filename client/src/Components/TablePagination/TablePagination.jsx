import { useState, useEffect } from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable"
import { useLocation } from "react-router-dom";
import EquipmentTable from "../EquipmentTable";

const TablePagination = ({ employees, equipments, onDelete, handleInput, setOrderBy, attended, setAttended, setMissings}) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const TOTAL_VALUES_PER_PAGE = 10;
    const location = useLocation()
    const isEquipmentRoute = location.pathname.startsWith("/equipment")
    const length = isEquipmentRoute ? equipments.length : employees.length

  useEffect(() => {
        const startIndex = currentPageNumber === 1 ? 0 : (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
        const endIndex = startIndex + TOTAL_VALUES_PER_PAGE;
        isEquipmentRoute
          ? setDataToDisplay(equipments?.slice(startIndex, endIndex))
          : setDataToDisplay(employees?.slice(startIndex, endIndex));
    }, [employees, equipments, currentPageNumber])

    return (
      <>
        {isEquipmentRoute ? (
          <EquipmentTable equipments={equipments} onDelete={onDelete} />
        ) : (
          <EmployeeTable
            employees={dataToDisplay}
            onDelete={onDelete}
            handleInput={handleInput}
            setOrderBy={setOrderBy}
            attended={attended}
            setAttended={setAttended}
            setMissings={setMissings}
          />
        )}

        <button
          onClick={(e) => setCurrentPageNumber((prev) => prev - 1)}
          disabled={currentPageNumber === 1}
        >
          Prev
        </button>
        <button
          onClick={(e) => setCurrentPageNumber((prev) => prev + 1)}
          disabled={currentPageNumber >= Math.ceil(length / TOTAL_VALUES_PER_PAGE)}
        >
          Next
        </button>
      </>
    );
}

export default TablePagination