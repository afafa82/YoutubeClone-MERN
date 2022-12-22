import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";

function App() {
  return (
    <>
      <Router>
      <NavBar />
      
      <div >
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/video/upload" element={<VideoUploadPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
