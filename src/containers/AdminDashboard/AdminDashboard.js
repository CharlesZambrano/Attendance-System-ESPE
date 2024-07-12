import React from "react";
import PersonnelTable from "../../components/PersonnelTable/PersonnelTable";
import "./AdminDashboard.scss";

const AdminDashboard = ({ setIsLoading }) => {
  const handleLoadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  };

  React.useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <h1>PERSONAL</h1>
          <PersonnelTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
