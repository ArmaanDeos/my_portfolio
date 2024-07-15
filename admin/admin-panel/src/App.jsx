import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageProjects from "./pages/ManageProjects";
import ManageTimeline from "./pages/ManageTimeline";
import ViewProjects from "./pages/ViewProjects";
import UpdateProjects from "./pages/UpdateProjects";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage-skills" element={<ManageSkills />} />
          <Route path="/manage-projects" element={<ManageProjects />} />
          <Route path="/manage-timeline" element={<ManageTimeline />} />
          <Route path="/view-project/:id" element={<ViewProjects />} />
          <Route path="/update-project/:id" element={<UpdateProjects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
