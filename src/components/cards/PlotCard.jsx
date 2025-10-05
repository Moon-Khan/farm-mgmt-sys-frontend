import React from 'react';
import PropTypes from 'prop-types';
import { 
  LocationIcon, 
  WheatIcon, 
  CornIcon, 
  PersonIcon, 
  CalendarIcon, 
  TaskIcon, 
  WaterIcon, 
  ChartIcon, 
  DetailsIcon 
} from '../icons/ProfessionalIcons';
import { STATUS_CONFIG, CROP_ICONS, ACTION_BUTTONS } from '../../constants/dashboardConfig';

// Helper to map icon string to actual component
const ICON_MAP = {
  LocationIcon,
  WheatIcon,
  CornIcon,
  WaterIcon,
  ChartIcon,
  DetailsIcon,
  PersonIcon,
  CalendarIcon,
  TaskIcon,
  // Default fallback for unknown crops
  default: () => <span className="text-green-600">🌱</span>
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.growing;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${config.bgColor} ${config.textColor}`}>
      <div className={`w-2 h-2 ${config.dotColor} rounded-full`}></div>
      <span>{config.label}</span>
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.keys(STATUS_CONFIG)).isRequired
};

// Crop Icon Component
const CropIcon = ({ crop }) => {
  // Handle missing or invalid crop data
  if (!crop || crop === "N/A" || crop === "No crop assigned") {
    return <span className="text-green-600">🌱</span>;
  }

  const iconKey = CROP_ICONS[crop] || 'default';
  const IconComponent = ICON_MAP[iconKey];

  if (!IconComponent) {
    return <span className="text-green-600">🌱</span>;
  }

  return <IconComponent className="w-5 h-5" color="#059669" />;
};

CropIcon.propTypes = {
  crop: PropTypes.string.isRequired
};

// Action Button Component
const ActionButton = ({ label, icon, bgColor, textColor, hoverColor, onClick }) => {
  const IconComponent = ICON_MAP[icon];
  return (
    <button
      className={`flex-1 ${bgColor} ${textColor} px-3 py-2 rounded-lg flex items-center justify-center gap-2 font-medium text-sm ${hoverColor} transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

// Main PlotCard Component
const PlotCard = ({ name, acres, crop, caretaker, status, nextTask, onWater, onTrack, onDetails, onMenuClick, lastActivity, daysSincePlanted }) => {
  // Handle missing data gracefully
  const displayCaretaker = caretaker && caretaker !== "N/A" ? caretaker : "Not assigned";
  const displayCrop = crop && crop !== "N/A" ? crop : "No crop assigned";
  const statusLabel = STATUS_CONFIG[status]?.label || "Growing";

  // Calculate last activity display
  const getLastActivityText = () => {
    if (lastActivity) {
      const days = Math.floor((new Date() - new Date(lastActivity)) / (1000 * 60 * 60 * 24));
      if (days === 0) return "Today";
      if (days === 1) return "Yesterday";
      return `${days} days ago`;
    }
    return daysSincePlanted ? `${daysSincePlanted} days growing` : "No recent activity";
  };

  // Enhanced next task display with priority indicators
  const getNextTaskWithPriority = () => {
    if (!nextTask) return "No tasks scheduled";

    // Add priority indicators based on task content
    if (nextTask.toLowerCase().includes('daily') || nextTask.toLowerCase().includes('urgent')) {
      return `🔴 ${nextTask}`;
    }
    if (nextTask.toLowerCase().includes('weekly') || nextTask.toLowerCase().includes('check')) {
      return `🟡 ${nextTask}`;
    }
    if (nextTask.toLowerCase().includes('monitor') || nextTask.toLowerCase().includes('prepare')) {
      return `🟢 ${nextTask}`;
    }

    return nextTask;
  };

  return (
    <div className={`bg-white border border-green-100 border-l-4 border-l-green-500 rounded-2xl shadow p-4 relative overflow-hidden hover:shadow-lg transition-shadow duration-200`}>
      {/* Top row with name and status */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <div className="flex items-center gap-2 flex-1">
          <LocationIcon className="w-5 h-5" color="#059669" />
          <span className="font-semibold text-base md:text-lg text-gray-800">{name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={status} />
          <button
            className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded-full flex-shrink-0 transition-colors"
            onClick={onMenuClick}
            aria-label="Plot options"
          >
            <span className="text-lg">⋮</span>
          </button>
        </div>
      </div>

      {/* Plot details grid with improved styling */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-3">
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-green-600 text-lg">📏</span>
          <div>
            <div className="font-medium text-gray-800">{acres} acres</div>
            <div className="text-xs text-gray-500">Area</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-100">
          <CropIcon crop={crop} />
          <div>
            <div className="font-medium text-gray-800">{displayCrop}</div>
            <div className="text-xs text-gray-500">Current crop</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
          <PersonIcon className="w-4 h-4" color="#3B82F6" />
          <div>
            <div className="font-medium text-gray-800">{displayCaretaker}</div>
            <div className="text-xs text-gray-500">Caretaker</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
          <CalendarIcon className="w-4 h-4" color="#D97706" />
          <div>
            <div className="font-medium text-gray-800">Last Activity</div>
            <div className="text-xs text-gray-500">{getLastActivityText()}</div>
          </div>
        </div>
      </div>

      {/* Next task banner with improved styling */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 text-sm rounded-lg p-3 mt-4 flex items-center gap-2 border border-orange-200">
        <TaskIcon className="w-4 h-4" color="#EA580C" />
        <span className="font-medium">Next: {getNextTaskWithPriority()}</span>
      </div>

      {/* Action buttons with better styling */}
      <div className="flex flex-col md:flex-row justify-between gap-2 mt-4">
        {ACTION_BUTTONS.map((button) => (
          <ActionButton
            key={button.label}
            {...button}
            onClick={
              button.action === "water" ? onWater :
              button.action === "track" ? onTrack :
              onDetails
            }
          />
        ))}
      </div>
    </div>
  );
};

PlotCard.propTypes = {
  name: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  crop: PropTypes.string.isRequired,
  caretaker: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS_CONFIG)).isRequired,
  nextTask: PropTypes.string.isRequired,
  onWater: PropTypes.func,
  onTrack: PropTypes.func,
  onDetails: PropTypes.func,
  onMenuClick: PropTypes.func,
  lastActivity: PropTypes.string,
  daysSincePlanted: PropTypes.number
};

PlotCard.defaultProps = {
  onWater: () => {},
  onTrack: () => {},
  onDetails: () => {},
  onMenuClick: () => {}
};

export default PlotCard;