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
import ProgressIndicator from "./components/ProgressIndicator/ProgressIndicator";
import "./App.scss";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <ProgressIndicator isLoading={isLoading} />
      <Header />
      <main className={isLoginPage ? "login-main" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={<AdminDashboard setIsLoading={setIsLoading} />}
          />
          {/* Otros routes aquí */}
        </Routes>
      </main>
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
