import React, { createContext, useState, useEffect } from "react";
import { getAttendance } from "../services/attendanceService";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttendance();
      setAttendance(data);
    };

    fetchData();
  }, []);

  return (
    <AttendanceContext.Provider value={{ attendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};
