const API_BASE_URL = 'http://localhost:5000/v1';

export const fetchFinancialOverview = async (timeframe = 'month', plotId = null) => {
  try {
    const params = new URLSearchParams({ timeframe });
    if (plotId) params.append('plot_id', plotId);
    
    const response = await fetch(`${API_BASE_URL}/reports/financial?${params}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching financial overview:', error);
    return { success: false, error: error.message };
  }
};

export const fetchCropYieldAnalysis = async (plotId = null) => {
  try {
    const params = new URLSearchParams();
    if (plotId) params.append('plot_id', plotId);
    
    const response = await fetch(`${API_BASE_URL}/reports/crop-yield?${params}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching crop yield analysis:', error);
    return { success: false, error: error.message };
  }
};

export const fetchResourceEfficiency = async (timeframe = 'month', plotId = null) => {
  try {
    const params = new URLSearchParams({ timeframe });
    if (plotId) params.append('plot_id', plotId);
    
    const response = await fetch(`${API_BASE_URL}/reports/efficiency?${params}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching resource efficiency:', error);
    return { success: false, error: error.message };
  }
};

export const fetchDashboardData = async (timeframe = 'month', plotId = null) => {
  try {
    const params = new URLSearchParams({ timeframe });
    if (plotId) params.append('plot_id', plotId);
    
    const response = await fetch(`${API_BASE_URL}/reports/dashboard?${params}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { success: false, error: error.message };
  }
};
