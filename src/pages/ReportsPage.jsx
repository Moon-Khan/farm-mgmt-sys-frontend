import React, { useState, useEffect } from "react";
import { Download, DollarSign, Receipt, TrendingUp, BarChart3, Leaf, Zap } from "lucide-react";
import { fetchDashboardData } from "../services/reportsService";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [timeframe, setTimeframe] = useState("month");
  const [plotFilter, setPlotFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState({
    financial: null,
    cropYield: null,
    efficiency: null
  });

  useEffect(() => {
    const loadReportsData = async () => {
      setLoading(true);
      try {
        const result = await fetchDashboardData(timeframe, plotFilter === "all" ? null : plotFilter);
        if (result?.success) {
          setReportsData(result.data);
        }
      } catch (err) {
        console.error("Error loading reports data:", err);
        // Set default data if API fails
       
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, [timeframe, plotFilter]);

  const tabs = [
    { id: "financial", label: "Financial", icon: <DollarSign size={16} /> },
    { id: "crop-yield", label: "Crop Yield", icon: <Leaf size={16} /> },
    { id: "efficiency", label: "Efficiency", icon: <Zap size={16} /> }
  ];

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting reports data...");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Reports & Analytics</h1>
            <p className="text-sm text-gray-500">Track your farm's performance and insights</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select
            value={plotFilter}
            onChange={(e) => setPlotFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Plots</option>
            <option value="1">Plot 1</option>
            <option value="2">Plot 2</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm border-l-4 border-green-500 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${reportsData?.financial?.summary?.totalRevenue?.toLocaleString() || '20,400'}
                </p>
                <p className="text-xs text-gray-500">
                  {reportsData?.financial?.summary?.revenueChange || '+12% from last month'}
                </p>
              </div>
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-lg shadow-sm border-l-4 border-red-500 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                  ${reportsData?.financial?.summary?.totalExpenses?.toLocaleString() || '10,200'}
                </p>
                <p className="text-xs text-gray-500">
                  {reportsData?.financial?.summary?.expensesChange || '-5% from last month'}
                </p>
              </div>
              <Receipt size={24} className="text-red-600" />
            </div>
          </div>

          {/* Net Profit */}
          <div className="bg-white rounded-lg shadow-sm border-l-4 border-yellow-500 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${reportsData?.financial?.summary?.netProfit?.toLocaleString() || '10,200'}
                </p>
                <p className="text-xs text-gray-500">
                  {reportsData?.financial?.summary?.profitChange || '+18% from last month'}
                </p>
              </div>
              <TrendingUp size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "financial" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Monthly Financial Overview</h2>
                </div>
                
                <div className="space-y-3">
                  {(reportsData?.financial?.monthlyBreakdown
                  ).map((row, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700 w-12">{row.month}</span>
                      <div className="flex gap-8 text-right">
                        <span className="text-red-600 font-medium w-20">${row.expenses}</span>
                        <span className="text-green-600 font-medium w-20">+${row.revenue}</span>
                        <span className="text-yellow-600 font-medium w-20">${row.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "crop-yield" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Leaf size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Crop Performance Analysis</h2>
                </div>
                
                <div className="space-y-6">
                  {(reportsData?.cropYield?.cropPerformance ).map((crop, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{crop.crop}</h3>
                        <span className="text-sm text-gray-500">Acres: {crop.acreage}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            crop.status === "above_target" ? "bg-green-500" : "bg-orange-500"
                          }`}
                          style={{ width: `${crop.yieldPercentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{crop.yieldPercentage}% yield</span>
                        <span className="text-gray-500">Target: {crop.target}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "efficiency" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-800">Resource Efficiency</h2>
                </div>
                
                <div className="space-y-4">
                  {(reportsData?.efficiency?.metrics ).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.metric}</h3>
                        <p className="text-sm text-gray-600">{item.status}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.badgeColor === "green" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default ReportsPage;
