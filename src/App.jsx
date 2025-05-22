import { useState } from "react";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";


function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Navigate to="/dashboard/gallery" replace />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/gallery" replace />} />
    </Routes>
  );
}

export default App;
