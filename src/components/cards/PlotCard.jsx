import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { 
  LocationIcon, 
  WheatIcon, 
  CornIcon, 
  PersonIcon, 
  CalendarIcon, 
  TaskIcon, 
  WaterIcon, 
  ChartIcon, 
  DetailsIcon,
  EditIcon,
  DeleteIcon
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
  EditIcon,
  DeleteIcon,
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
const PlotCard = ({ name, acres, crop, caretaker, status, nextTask, onWater, onTrack, onDetails, onMenuClick, lastActivity, daysSincePlanted, id, onDelete }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  };

  // Handle dropdown menu actions
  const handleEdit = () => {
    navigate(`/plots/${id}/edit`);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setShowDropdown(false);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setShowDeleteModal(false);
  };

  // Handle click outside to close dropdown
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <>
      <div className={`bg-white border border-green-100 border-l-4 border-l-green-500 rounded-2xl shadow p-4 relative overflow-hidden hover:shadow-lg transition-shadow duration-200`}>
        {/* Top row with name and status */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="flex items-center gap-2 flex-1">
            <LocationIcon className="w-5 h-5" color="#059669" />
            <span className="font-semibold text-base md:text-lg text-gray-800">{name}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusBadge status={status} />
            <div className="dropdown-container relative">
              <button
                className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded-full flex-shrink-0 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                aria-label="Plot options"
              >
                <span className="text-lg">⋮</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <DeleteIcon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <DeleteIcon className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Plot</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>"{name}"</strong>? This will permanently remove the plot and all associated data.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlotCard;
