import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import RemindersPage from "./pages/RemindersPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

// Layout Components
import FooterNav from "./components/layout/FooterNav";

const AuthOnly = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

const FooterWrapper = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");
  return hideFooter ? null : <FooterNav />;
};

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#fcfcf7]">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Navigate to="/signup" replace />} />

            {/* Auth routes */}
            <Route path="/login" element={<AuthOnly><LoginPage /></AuthOnly>} />
            <Route path="/signup" element={<AuthOnly><SignupPage /></AuthOnly>} />

            {/* Protected app routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add-plot" element={<AddPlot />} /> 
            <Route path="/plots" element={<ProtectedRoute><PlotsPage /></ProtectedRoute>} />
            <Route path="/plots/:id" element={<ProtectedRoute><PlotDetailsPage /></ProtectedRoute>} />
            <Route path="/plots/:id/edit" element={<ProtectedRoute><EditPlotPage /></ProtectedRoute>} />
            <Route path="/plots/:id/timeline" element={<ProtectedRoute><CropTimelinePage /></ProtectedRoute>} />
            <Route path="/plots/:id/timeline/add-event" element={<ProtectedRoute><AddEventPage /></ProtectedRoute>} />
            <Route path="/plots/:id/add-lifecycle" element={<ProtectedRoute><AddEventPage /></ProtectedRoute>} />
            <Route path="/plots/:id/add-fertilizer" element={<ProtectedRoute><AddFertilizerPage /></ProtectedRoute>} />
            <Route path="/plots/:id/add-pesticide" element={<ProtectedRoute><AddPesticidePage /></ProtectedRoute>} />
            <Route path="/plots/:id/add-irrigation" element={<ProtectedRoute><AddIrrigationPage /></ProtectedRoute>} />
            <Route path="/plots/:id/add-expense" element={<ProtectedRoute><AddExpensePage /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><RemindersPage /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Routes>
        </main>

        {/* Bottom Navigation (mobile-first) */}
        <FooterWrapper />
      </div>
    </Router>
  );
};

export default App;
