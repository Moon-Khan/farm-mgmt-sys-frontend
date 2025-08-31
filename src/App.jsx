import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import AddPlot from "./pages/AddPlot"; 
// (You can later add: Plots, Schedule, Reports, Settings)

// Layout Components
import FooterNav from "./components/layout/FooterNav";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#fcfcf7]">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-plot" element={<AddPlot />} /> 
            {/* Placeholder routes for future pages */}
            <Route path="/plots" element={<div>Plots Page</div>} />
            <Route path="/schedule" element={<div>Schedule Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </main>

        {/* Bottom Navigation (mobile-first) */}
        <FooterNav />
      </div>
    </Router>
  );
};

export default App;
