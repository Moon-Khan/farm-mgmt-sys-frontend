import React from 'react';
import PropTypes from 'prop-types';

const SummaryCard = ({ icon, label, value, bgColor }) => {
  return (
    <div className={`rounded-xl shadow flex flex-col items-center py-4 px-2 ${bgColor} relative overflow-hidden`}>
      {/* Colored left border accent */}
      <div className={`${
        bgColor.includes('green') ? 'bg-green-500' :
        bgColor.includes('yellow') ? 'bg-yellow-500' :
        bgColor.includes('orange') ? 'bg-orange-500' :
        bgColor.includes('blue') ? 'bg-blue-500' :
        'bg-gray-500'
      }`}></div>
      
      <div className="mb-1">{icon}</div>
      <div className="text-[1.7rem] font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

SummaryCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bgColor: PropTypes.string.isRequired
};

export default SummaryCard;
