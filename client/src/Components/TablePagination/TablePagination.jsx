import { useState, useEffect } from "react";
import EmployeeTable from "../EmployeeTable/EmployeeTable"

const TablePagination = ({ employees, onDelete, handleInput, setOrderBy, attended, setAttended, setMissings}) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const TOTAL_VALUES_PER_PAGE = 10;

    useEffect(() => {
        const startIndex = currentPageNumber === 1 ? 0 : (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
        const endIndex = startIndex + TOTAL_VALUES_PER_PAGE;
        setDataToDisplay(employees.slice(startIndex, endIndex));
    }, [employees, currentPageNumber])

    return (
      <>
        <EmployeeTable
          employees={dataToDisplay}
          onDelete={onDelete}
          handleInput={handleInput}
          setOrderBy={setOrderBy}
          attended={attended}
          setAttended={setAttended}
          setMissings={setMissings}
        />
        <button
          onClick={(e) => setCurrentPageNumber((prev) => prev - 1)}
          disabled={currentPageNumber === 1}
        >
          Prev
        </button>
        <button
          onClick={(e) => setCurrentPageNumber((prev) => prev + 1)}
          disabled={currentPageNumber >= Math.ceil(employees.length / TOTAL_VALUES_PER_PAGE)}
        >
          Next
        </button>
      </>
    );
}

export default TablePagination