import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonnelTable from "../../components/PersonnelTable/PersonnelTable";
import "./AdminDashboard.scss";

const AdminDashboard = ({ setIsLoading }) => {
  // Simulación de una operación que tarda tiempo
  const handleLoadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <Sidebar selectedMenu="personal" />
        <div className="main-content">
          <h1>PERSONAL</h1>
          <PersonnelTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
