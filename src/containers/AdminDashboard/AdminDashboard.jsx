import React, { useCallback, useEffect } from "react";
import PersonnelTable from "../../components/PersonnelTable/PersonnelTable";
import "./AdminDashboard.scss";

const AdminDashboard = ({ setIsLoading }) => {
  const handleLoadData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  }, [setIsLoading]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <h2>PERSONAL</h2>
          <PersonnelTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
