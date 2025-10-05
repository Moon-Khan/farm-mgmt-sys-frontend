// const API_BASE_URL = 'http://localhost:5000/v1';

function authHeaders() {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const fetchFinancialOverview = async (timeframe = 'month', plotId = null) => {
  try {
    const params = new URLSearchParams({ timeframe });
    if (plotId) params.append('plot_id', plotId);
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/reports/financial?${params}`, { headers: { ...authHeaders() } });
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
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/reports/crop-yield?${params}`, { headers: { ...authHeaders() } });
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
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/reports/efficiency?${params}`, { headers: { ...authHeaders() } });
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
    
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/reports/dashboard?${params}`, { headers: { ...authHeaders() } });
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { success: false, error: error.message };
  }
};
