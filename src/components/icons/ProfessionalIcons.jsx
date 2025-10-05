import React from 'react';

// Professional SVG Icons to replace emojis
export const LocationIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export const PlantIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25z"/>
  </svg>
);

export const ThermometerIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h-2V5zm-2 8c0-.55.45-1 1-1s1 .45 1 1v1h-2v-1z"/>
  </svg>
);

export const RainIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM7 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
  </svg>
);

export const WarningIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

export const WheatIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M12 2c-1.5 0-3 .5-4 1.5L6 5c-1.5 1-2.5 2.5-2.5 4.5 0 1 .3 2 .8 3L12 20l7.7-7.5c.5-1 .8-2 .8-3 0-2-1-3.5-2.5-4.5L16 3.5C15 2.5 13.5 2 12 2z"/>
    {/* Wheat stalk details */}
    <path d="M8 8v8M16 8v8M10 6v12M14 6v12" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="10" cy="10" r="1" fill={color}/>
    <circle cx="14" cy="12" r="1" fill={color}/>
    <circle cx="10" cy="14" r="1" fill={color}/>
  </svg>
);

export const CornIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M12 2c-1.5 0-3 .5-4 1.5L6 5c-1.5 1-2.5 2.5-2.5 4.5 0 1 .3 2 .8 3L12 20l7.7-7.5c.5-1 .8-2 .8-3 0-2-1-3.5-2.5-4.5L16 3.5C15 2.5 13.5 2 12 2z"/>
    {/* Corn cob details */}
    <path d="M9 8h6M9 10h6M9 12h6M9 14h6" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="10" cy="9" r="0.8" fill="#FFD700"/>
    <circle cx="12" cy="9" r="0.8" fill="#FFD700"/>
    <circle cx="14" cy="9" r="0.8" fill="#FFD700"/>
    <circle cx="10" cy="11" r="0.8" fill="#FFD700"/>
    <circle cx="12" cy="11" r="0.8" fill="#FFD700"/>
    <circle cx="14" cy="11" r="0.8" fill="#FFD700"/>
    <circle cx="10" cy="13" r="0.8" fill="#FFD700"/>
    <circle cx="12" cy="13" r="0.8" fill="#FFD700"/>
    <circle cx="14" cy="13" r="0.8" fill="#FFD700"/>
  </svg>
);

export const PersonIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

export const CalendarIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

export const WaterIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
  </svg>
);

export const ChartIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
  </svg>
);

export const DetailsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
);

export const TaskIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg className={className} fill={color} viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
); 