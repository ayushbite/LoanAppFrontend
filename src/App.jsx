import { useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from './components/AdminDashboard/Dashboard';
import MainAuthentication from './components/Authentication/MainAuthentication';

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Navigate replace to="/" />} />
          <Route path="/login" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/signup" element={<MainAuthentication />} />
          <Route path="/login" element={<MainAuthentication />} />
        </>
      )}
    </Routes>
  );
}

export default App;
