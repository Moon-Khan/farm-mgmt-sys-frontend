// Dashboard configuration constants
export const STATUS_CONFIG = {
  growing: {
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    dotColor: "bg-green-500",
    label: "Growing"
  },
  harvested: {
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    dotColor: "bg-yellow-500",
    label: "Ready!"
  },
  planting: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    dotColor: "bg-blue-500",
    label: "Planted!"
  }
};

export const CROP_ICONS = {
  Wheat: 'WheatIcon',
  Corn: 'CornIcon',
  Tomatoes: 'tomato'
};

export const ACTION_BUTTONS = [
  {
    label: "Water",
    icon: "WaterIcon",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    hoverColor: "hover:bg-blue-100",
    action: "water"
  },
  {
    label: "Track",
    icon: "ChartIcon",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    hoverColor: "hover:bg-green-100",
    action: "track"
  },
  {
    label: "Details",
    icon: "DetailsIcon",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    hoverColor: "hover:bg-gray-100",
    action: "details"
  }
];

export const SUMMARY_CARDS_CONFIG = [
  {
    icon: "LocationIcon",
    iconColor: "#059669",
    label: "Total Acres",
    bgColor: "bg-green-50 border border-green-100",
    getValue: (plots) => plots.reduce((acc, p) => acc + p.acres, 0).toFixed(1)
  },
  {
    icon: "PlantIcon",
    iconColor: "#D97706",
    label: "Active Plots",
    bgColor: "bg-yellow-50 border border-yellow-100",
    getValue: (plots) => plots.length
  },
  {
    icon: "ThermometerIcon",
    iconColor: "#EA580C",
    label: "Temperature",
    bgColor: "bg-orange-50 border border-orange-100",
    getValue: (weather) => `${weather?.temperature}°C`
  },
  {
    icon: "RainIcon",
    iconColor: "#2563EB",
    label: "Expected Rain",
    bgColor: "bg-blue-50 border border-blue-100",
    getValue: (weather) => `${weather?.expectedRain}mm`
  }
];

// Color constants
export const COLORS = {
  primary: {
    green: "#059669",
    yellow: "#D97706",
    orange: "#EA580C",
    blue: "#2563EB"
  },
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    accent: "#059669"
  }
};

// Spacing constants
export const SPACING = {
  section: "px-4 mb-4",
  card: "p-4",
  button: "px-4 py-2"
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: "grid-cols-2",
  desktop: "md:grid-cols-4"
}; 