// src/pages/PlotDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Leaf,
  Calendar,
  User,
  MapPin,
  ClipboardList,
  Droplets,
  Bug,
  DollarSign,
  Sprout,
  Plus,
  Clock,
  RefreshCw,
} from "lucide-react";
import { fetchPlotById } from "../services/plotsService";
import { fetchFertilizersByPlot } from "../services/fertilizerService";
import { fetchPesticidesByPlot } from "../services/pesticideService";
import { fetchIrrigationsByPlot } from "../services/irrigationService";
import { fetchExpensesByPlot } from "../services/expenseService";
import { fetchLifecyclesByPlot } from "../services/lifecycleService";
import { fetchUpcomingReminders } from "../services/reminderService";

const TABS = [
  { key: "lifecycle", label: "Lifecycle", icon: <Sprout size={18} /> },
  { key: "fertilizer", label: "Fertilizer", icon: <ClipboardList size={18} /> },
  { key: "pesticide", label: "Pesticide", icon: <Bug size={18} /> },
  { key: "irrigation", label: "Irrigation", icon: <Droplets size={18} /> },
  { key: "expenses", label: "Expenses/Yield", icon: <DollarSign size={18} /> },
];

const PlotDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("lifecycle");
  
  // Tab data states
  const [fertilizers, setFertilizers] = useState([]);
  const [pesticides, setPesticides] = useState([]);
  const [irrigations, setIrrigations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [lifecycles, setLifecycles] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);

  // Load plot data
  useEffect(() => {
    const loadPlot = async () => {
      try {
        const res = await fetchPlotById(id);
        if (res?.success && res?.data) {
          setPlot(res.data);
        }
      } catch (err) {
        console.error("Error loading plot:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPlot();
  }, [id]);

  // Load tab-specific data when tab changes
  useEffect(() => {
    const loadTabData = async () => {
      if (!id) return;
      
      setTabLoading(true);
      try {
        switch (activeTab) {
          case "fertilizer":
            const fertRes = await fetchFertilizersByPlot(id);
            setFertilizers(fertRes?.success ? fertRes.data : []);
            break;
          case "pesticide":
            const pestRes = await fetchPesticidesByPlot(id);
            setPesticides(pestRes?.success ? pestRes.data : []);
            break;
          case "irrigation":
            const irrRes = await fetchIrrigationsByPlot(id);
            setIrrigations(irrRes?.success ? irrRes.data : []);
            break;
          case "expenses":
            const expRes = await fetchExpensesByPlot(id);
            setExpenses(expRes?.success ? expRes.data : []);
            break;
          case "lifecycle":
            const lifecycleRes = await fetchLifecyclesByPlot(id);
            setLifecycles(lifecycleRes?.success ? lifecycleRes.data : []);
            break;
        }
      } catch (err) {
        console.error(`Error loading ${activeTab} data:`, err);
      } finally {
        setTabLoading(false);
      }
    };
    
    loadTabData();
  }, [activeTab, id]);

  // Load upcoming tasks for this plot
  useEffect(() => {
    const loadUpcomingTasks = async () => {
      if (!id) return;

      setTasksLoading(true);
      try {
        const res = await fetchUpcomingReminders(7); // Get next 7 days
        if (res?.success && res?.data) {
          // Filter tasks for this specific plot
          const plotTasks = res.data.filter(task => task.plot_id === parseInt(id));
          setUpcomingTasks(plotTasks);
        }
      } catch (err) {
        console.error("Error loading upcoming tasks:", err);
        setUpcomingTasks([]);
      } finally {
        setTasksLoading(false);
      }
    };

    loadUpcomingTasks();
  }, [id]);

  // Priority calculation function (same as RemindersPage)
  const priorityFor = (task) => {
    const now = new Date();
    const due = new Date(task.due_date);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (diffDays <= 2) return "high";
    if (diffDays <= 5) return "medium";
    return "low";
  };

  // Badge classes function (same as RemindersPage)
  const badgeClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  // Format date function (same as RemindersPage)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  const handleAddLog = () => {
    // Navigate to appropriate add form based on active tab
    switch (activeTab) {
      case 'lifecycle':
        navigate(`/plots/${id}/add-lifecycle`);
        break;
      case 'fertilizer':
        navigate(`/plots/${id}/add-fertilizer`);
        break;
      case 'pesticide':
        navigate(`/plots/${id}/add-pesticide`);
        break;
      case 'irrigation':
        navigate(`/plots/${id}/add-irrigation`);
        break;
      case 'expenses':
        navigate(`/plots/${id}/add-expense`);
        break;
      default:
        console.log(`Add ${activeTab} log`);
    }
  };

  const handleViewTimeline = () => {
    navigate(`/plots/${id}/timeline`);
  };

  // Refresh tasks function (for when tasks are completed)
  const refreshTasks = () => {
    const loadUpcomingTasks = async () => {
      try {
        const res = await fetchUpcomingReminders(7);
        if (res?.success && res?.data) {
          const plotTasks = res.data.filter(task => task.plot_id === parseInt(id));
          setUpcomingTasks(plotTasks);
        }
      } catch (err) {
        console.error("Error refreshing tasks:", err);
      }
    };
    loadUpcomingTasks();
  };

  if (loading) return <p className="p-4 text-gray-500">Loading plot details...</p>;
  if (!plot) return <p className="p-4 text-red-500">Plot not found.</p>;

  return (
    <div className="flex flex-col h-screen">
      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{plot.name}</h1>
              <p className="text-sm text-gray-500">{plot.acreage} acres • {plot.status || "Active"}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(`/plots/${id}/edit`)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Edit
          </button>
        </div>

        {/* Current Crop Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Current Status</h2>
              <div className="flex items-center gap-4 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  plot.status === "growing" ? "bg-green-100 text-green-700" :
                  plot.status === "harvested" ? "bg-yellow-100 text-yellow-700" :
                  "bg-blue-100 text-blue-700"
                }`}>
                  {plot.status || "Growing"}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-700 font-medium">{plot.current_crop?.name || "No crop assigned"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plot Information Card */}
        <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
          <div className="flex items-center gap-2">
            <User size={16} className="text-blue-600" />
            <div className="text-sm">
              <span className="font-medium text-gray-800">Caretaker</span>
              <p className="text-gray-600">
                {plot.caretaker?.name ? `${plot.caretaker.name} • ${plot.caretaker.contact_info || 'No contact info'}` : 'No caretaker assigned'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green-600" />
            <div className="text-sm">
              <span className="font-medium text-gray-800">Planted Date</span>
              <p className="text-gray-600">
                {plot.planted_date ? new Date(plot.planted_date).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-orange-600" />
            <div className="text-sm">
              <span className="font-medium text-gray-800">Expected Harvest</span>
              <p className="text-gray-600">
                {plot.expected_harvest_date ? new Date(plot.expected_harvest_date).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-medium text-sm mb-1 text-gray-800">Notes</h3>
            <p className="text-gray-600 text-sm">{plot.notes || 'No notes available'}</p>
          </div>
        </div>

        {/* Upcoming Tasks - Dynamic */}
        {tasksLoading ? (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h2 className="font-semibold mb-3 text-gray-800">Upcoming Tasks</h2>
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            </div>
          </div>
        ) : upcomingTasks.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-800">Upcoming Tasks</h2>
              <button
                onClick={refreshTasks}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                title="Refresh tasks"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {upcomingTasks.slice(0, 3).map((task) => {
                const priority = priorityFor(task);

                return (
                  <div key={task.id} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                    <div>
                      <span className="font-medium text-sm text-gray-800">{task.title || task.type}</span>
                      <p className="text-xs text-gray-500">Due: {formatDate(task.due_date)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${badgeClasses(priority)} font-medium`}>
                      {priority}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-800">Upcoming Tasks</h2>
              <button
                onClick={refreshTasks}
                className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                title="Refresh tasks"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <div className="text-center py-6">
              <Clock size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">No upcoming tasks</p>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="flex border-b border-gray-200">
            {TABS.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-green-700 border-b-2 border-green-700 bg-green-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                } ${index === 0 ? "rounded-tl-lg" : ""} ${index === TABS.length - 1 ? "rounded-tr-lg" : ""}`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {tabLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <>
                {/* Lifecycle Timeline Tab */}
                {activeTab === "lifecycle" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Lifecycle Timeline</h3>
                      <button
                        onClick={handleAddLog}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={16} />
                        Add Event
                      </button>
                    </div>
                    
                    <div className="text-center py-12">
                      <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4">View full lifecycle timeline</p>
                      <button
                        onClick={handleViewTimeline}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Timeline
                      </button>
                    </div>
                  </div>
                )}

                {/* Irrigation Log Tab */}
                {activeTab === "irrigation" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Irrigation Log</h3>
                      <button
                        onClick={handleAddLog}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    
                    {irrigations.length > 0 ? (
                      <div className="space-y-3">
                        {irrigations.map((irrigation, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {irrigation.date ? new Date(irrigation.date).toLocaleDateString() : 'No date'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {irrigation.quantity}L
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Droplets size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No irrigation records yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Fertilizer Log Tab */}
                {activeTab === "fertilizer" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Fertilizer Log</h3>
                      <button
                        onClick={handleAddLog}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    
                    {fertilizers.length > 0 ? (
                      <div className="space-y-3">
                        {fertilizers.map((fertilizer, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {fertilizer.fertilizer_type}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {fertilizer.date ? new Date(fertilizer.date).toLocaleDateString() : 'No date'} • {fertilizer.quantity}kg
                                </p>
                              </div>
                              <span className="text-green-600 font-medium">${fertilizer.cost}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ClipboardList size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No fertilizer applications yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Pesticide Log Tab */}
                {activeTab === "pesticide" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Pesticide Log</h3>
                      <button
                        onClick={handleAddLog}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    
                    {pesticides.length > 0 ? (
                      <div className="space-y-3">
                        {pesticides.map((pesticide, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {pesticide.pesticide_type}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {pesticide.date ? new Date(pesticide.date).toLocaleDateString() : 'No date'} • {pesticide.quantity}L
                                </p>
                              </div>
                              <span className="text-red-600 font-medium">${pesticide.cost}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bug size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No pesticide applications yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Expenses & Yield Tab */}
                {activeTab === "expenses" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Expenses & Yield</h3>
                      <button
                        onClick={handleAddLog}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    
                    {expenses.length > 0 ? (
                      <div className="space-y-3">
                        {expenses.map((expense, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800 capitalize">
                                  {expense.type}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {expense.date ? new Date(expense.date).toLocaleDateString() : 'No date'}
                                </p>
                                {expense.description && (
                                  <p className="text-xs text-gray-500 mt-1">{expense.description}</p>
                                )}
                              </div>
                              <span className="text-red-600 font-medium">${expense.amount}</span>
                            </div>
                          </div>
                        ))}
                        
                        {/* Summary */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-800 mb-2">Summary</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-blue-600">Total Expenses:</span>
                              <p className="font-bold text-blue-800">
                                ${expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0).toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <span className="text-green-600">Expected Yield:</span>
                              <p className="font-bold text-green-800">Pending harvest</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">No expense records yet</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom spacer for mobile navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default PlotDetailsPage;
