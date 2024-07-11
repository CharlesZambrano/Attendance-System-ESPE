import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import PersonnelTable from "../../components/PersonnelTable/PersonnelTable";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <h1>PERSONAL</h1>
          <PersonnelTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
