import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./containers/Login/Login";
import AdminDashboard from "./containers/AdminDashboard/AdminDashboard";
import RegisterNew from "./containers/RegisterNew/RegisterNew";
import CreateDataset from "./containers/RegisterNew/CreateDataset";
import UploadDataset from "./containers/RegisterNew/UploadDataset";
import ProgressIndicator from "./components/ProgressIndicator/ProgressIndicator";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.scss";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <ProgressIndicator isLoading={isLoading} />
      <Header />
      <div className="app-content">
        {!isLoginPage && (
          <Sidebar selectedMenu={location.pathname.split("/")[1]} />
        )}
        <main className={isLoginPage ? "login-main" : "main-content"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={<AdminDashboard setIsLoading={setIsLoading} />}
            />
            <Route path="/register-new" element={<RegisterNew />} />
            <Route
              path="/register-new/create-dataset"
              element={<CreateDataset />}
            />
            <Route
              path="/register-new/upload-dataset"
              element={<UploadDataset />}
            />
            {/* Otros routes aquí */}
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
