import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import AddPlot from "./pages/AddPlot"; 
import PlotsPage from "./pages/PlotsPage";
import PlotDetailsPage from "./pages/PlotDetailsPage";
import EditPlotPage from "./pages/EditPlotPage";
import CropTimelinePage from "./pages/CropTimelinePage";
import AddEventPage from "./pages/AddEventPage";
import AddFertilizerPage from "./pages/AddFertilizerPage";
import AddPesticidePage from "./pages/AddPesticidePage";
import AddIrrigationPage from "./pages/AddIrrigationPage";
import AddExpensePage from "./pages/AddExpensePage";
import ReportsPage from "./pages/ReportsPage";

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
            <Route path="/plots" element={<PlotsPage />} />
            <Route path="/plots/:id" element={<PlotDetailsPage />} />
            <Route path="/plots/:id/edit" element={<EditPlotPage />} />
            <Route path="/plots/:id/timeline" element={<CropTimelinePage />} />
            <Route path="/plots/:id/timeline/add-event" element={<AddEventPage />} />
            <Route path="/plots/:id/add-lifecycle" element={<AddEventPage />} />
            <Route path="/plots/:id/add-fertilizer" element={<AddFertilizerPage />} />
            <Route path="/plots/:id/add-pesticide" element={<AddPesticidePage />} />
            <Route path="/plots/:id/add-irrigation" element={<AddIrrigationPage />} />
            <Route path="/plots/:id/add-expense" element={<AddExpensePage />} />
            <Route path="/schedule" element={<div>Schedule Page</div>} />
            <Route path="/reports" element={<ReportsPage />} />
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
