import React from 'react';
import PropTypes from 'prop-types';
import { WarningIcon } from '../icons/ProfessionalIcons';

const WeatherCard = ({ status, rain, humidity }) => (
<div className="bg-[#dbfaff]/20 border border-[#dbfaff]/40 rounded-2xl shadow flex items-center gap-3 p-4 relative overflow-hidden">    {/* Green left border accent */}
    <div className=""></div>
    
    <WarningIcon className="w-8 h-8" color="#EA580C" />
    <div>
      <div className="font-semibold text-orange-700 text-base">Weather Update</div>
      <div className="text-sm text-gray-600">{status}</div>
      <div className="text-xs text-gray-500 mt-1 flex gap-4">
        <span>Expected: <span className="font-semibold">{rain}mm</span></span>
        <span>Humidity: <span className="font-semibold">{humidity}%</span></span>
      </div>
    </div>
  </div>
);

WeatherCard.propTypes = {
  status: PropTypes.string.isRequired,
  rain: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired
};

export default WeatherCard;
