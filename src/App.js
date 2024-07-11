import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./containers/Login/Login";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Otros routes aquí */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
