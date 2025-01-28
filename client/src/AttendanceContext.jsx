// AttendanceContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
   const [attended, setAttended] = useState(() => {
     // Load initial state from local storage
     const saved = localStorage.getItem("attended");
     return saved ? JSON.parse(saved) : [];
   });

   useEffect(() => {
     // Save state to local storage whenever it changes
     localStorage.setItem("attended", JSON.stringify(attended));
   }, [attended]);

  return (
    <AttendanceContext.Provider value={{ attended, setAttended }}>
      {children}
    </AttendanceContext.Provider>
  );
};
