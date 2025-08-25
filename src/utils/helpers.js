// Utility functions for the dashboard

/**
 * Format acres to one decimal place
 * @param {number} acres - The number of acres
 * @returns {string} Formatted acres string
 */
export const formatAcres = (acres) => {
  return Number(acres).toFixed(1);
};

/**
 * Calculate total acres from plots array
 * @param {Array} plots - Array of plot objects
 * @returns {string} Total formatted acres
 */
export const calculateTotalAcres = (plots) => {
  return plots.reduce((acc, plot) => acc + plot.acres, 0).toFixed(1);
};

/**
 * Get status configuration for a given status
 * @param {string} status - The status to get config for
 * @returns {Object} Status configuration object
 */
export const getStatusConfig = (status) => {
  const STATUS_CONFIG = {
    growing: {
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      dotColor: "bg-green-500",
      label: "Growing"
    },
    ready: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      dotColor: "bg-yellow-500",
      label: "Ready!"
    },
    planted: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      dotColor: "bg-blue-500",
      label: "Planted!"
    }
  };

  return STATUS_CONFIG[status] || STATUS_CONFIG.growing;
};

/**
 * Get crop icon component for a given crop
 * @param {string} crop - The crop name
 * @returns {string} Icon identifier
 */
export const getCropIcon = (crop) => {
  const CROP_ICONS = {
    Wheat: 'WheatIcon',
    Corn: 'CornIcon',
    Tomatoes: 'tomato'
  };

  return CROP_ICONS[crop] || 'default';
};

/**
 * Format temperature with degree symbol
 * @param {number} temperature - Temperature in Celsius
 * @returns {string} Formatted temperature string
 */
export const formatTemperature = (temperature) => {
  return `${temperature}°C`;
};

/**
 * Format rain amount with mm unit
 * @param {number} rain - Rain amount
 * @returns {string} Formatted rain string
 */
export const formatRain = (rain) => {
  return `${rain}mm`;
};

/**
 * Generate unique key for list items
 * @param {string} prefix - Prefix for the key
 * @param {string|number} id - Unique identifier
 * @returns {string} Unique key string
 */
export const generateKey = (prefix, id) => {
  return `${prefix}-${id}`;
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate plot data
 * @param {Object} plot - Plot object to validate
 * @returns {boolean} Whether plot data is valid
 */
export const validatePlot = (plot) => {
  const requiredFields = ['id', 'name', 'acres', 'crop', 'caretaker', 'status', 'nextTask'];
  return requiredFields.every(field => plot.hasOwnProperty(field) && plot[field] !== null && plot[field] !== undefined);
};

/**
 * Sort plots by a given criteria
 * @param {Array} plots - Array of plots to sort
 * @param {string} criteria - Sort criteria ('name', 'acres', 'status')
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted plots array
 */
export const sortPlots = (plots, criteria = 'name', direction = 'asc') => {
  const sorted = [...plots].sort((a, b) => {
    let aVal = a[criteria];
    let bVal = b[criteria];

    // Handle numeric values
    if (criteria === 'acres') {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}; 