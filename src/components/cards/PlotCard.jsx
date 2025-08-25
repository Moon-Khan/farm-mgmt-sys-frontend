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
  tomato: () => <span className="text-gray-500">🍅</span>
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
  const iconKey = CROP_ICONS[crop] || 'tomato';
  const IconComponent = ICON_MAP[iconKey];
  return IconComponent ? <IconComponent className="w-4 h-4" color="#059669" /> : <span className="text-gray-500">🌱</span>;
};

CropIcon.propTypes = {
  crop: PropTypes.string.isRequired
};

// Action Button Component
const ActionButton = ({ label, icon, bgColor, textColor, hoverColor, onClick }) => {
  const IconComponent = ICON_MAP[icon];
  return (
    <button 
      className={`flex-1 ${bgColor} ${textColor} px-3 py-2 rounded-lg flex items-center justify-center gap-1 font-medium text-sm ${hoverColor} transition`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent className="w-4 h-4" color="currentColor" />}
      {label}
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
const PlotCard = ({ name, acres, crop, caretaker, status, nextTask, onWater, onTrack, onDetails, onMenuClick }) => {
  return (
    <div className="bg-white border border-green-100 rounded-2xl shadow p-4 relative overflow-hidden">
      {/* Green left border accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
      {/* Top row with name and status */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex items-center gap-2 flex-1">
          <LocationIcon className="w-5 h-5" color="#059669" />
          <span className="font-semibold text-base md:text-lg text-gray-800">{name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge status={status} />
          <button 
            className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded-full flex-shrink-0"
            onClick={onMenuClick}
            aria-label="Plot options"
          >
            <span className="text-lg">⋮</span>
          </button>
        </div>
      </div>
      {/* Plot details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">📏</span> {acres} acres
        </div>
        <div className="flex items-center gap-1">
          <CropIcon crop={crop} />
          {crop}
        </div>
        <div className="flex items-center gap-1">
          <PersonIcon className="w-4 h-4" color="#6B7280" />
          {caretaker}
        </div>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" color="#6B7280" />
          <span className="font-semibold text-green-700">
            {STATUS_CONFIG[status]?.label || "Growing"}
          </span>
        </div>
      </div>
      {/* Next task banner */}
      <div className="bg-orange-50 text-orange-700 text-sm rounded-md p-2 mt-3 flex items-center gap-2">
        <TaskIcon className="w-4 h-4" color="#EA580C" />
        <span>Next: {nextTask}</span>
      </div>
      {/* Action buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-2 mt-3">
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
  onMenuClick: PropTypes.func
};

PlotCard.defaultProps = {
  onWater: () => {},
  onTrack: () => {},
  onDetails: () => {},
  onMenuClick: () => {}
};

export default PlotCard;