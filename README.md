# FMS Frontend - Farm Management System

A modern, responsive React application for comprehensive farm management with plot tracking, crop lifecycle management, and automated reminders.

## 🚀 Features

- **Dashboard** - Real-time farm overview with weather integration
- **Plot Management** - Create, view, and manage farm plots with acreage tracking
- **Crop Management** - Track crop lifecycle from planting to harvest
- **Resource Management** - Apply fertilizers, pesticides, and schedule irrigation
- **Caretaker Management** - Assign and manage farm workers
- **Expense Tracking** - Monitor farm expenses and financial data
- **Automated Reminders** - View and manage farm task reminders
- **Mobile-First Design** - Responsive design optimized for all devices
- **Weather Integration** - Real-time weather data for smart farming decisions

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Routing**: React Router DOM 7.8.2
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.542.0
- **Build Tool**: Create React App 5.0.1
- **Testing**: Jest, React Testing Library
- **Package Manager**: npm

## 🏗️ **Architecture & Code Quality**

### **✅ Modern React Best Practices**
- **Functional Components** with hooks
- **Custom Hooks** for data management
- **Component Composition** for reusability
- **PropTypes** for type safety
- **Constants** for configuration management

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── cards/       # Card components (PlotCard, SummaryCard, etc.)
│   │   ├── icons/       # Custom SVG icons
│   │   └── layout/      # Layout components (Header, Footer, Navigation)
│   ├── constants/       # Configuration constants
│   │   ├── apiConfig.js # API endpoints configuration
│   │   └── statusConfig.js # Status color mappings
│   ├── hooks/           # Custom React hooks
│   │   ├── useApi.js    # API data fetching hook
│   │   └── useLocalStorage.js # Local storage management
│   ├── pages/           # Page components (16 pages)
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── AddPlot.jsx         # Add new plot
│   │   ├── PlotsPage.jsx       # All plots view
│   │   ├── PlotDetailsPage.jsx # Individual plot details
│   │   ├── AddCrop.jsx         # Add new crop
│   │   ├── CropsPage.jsx       # All crops view
│   │   ├── AddFertilizerPage.jsx # Fertilizer application
│   │   ├── AddPesticidePage.jsx  # Pesticide application
│   │   ├── IrrigationPage.jsx     # Irrigation management
│   │   ├── ExpensesPage.jsx       # Expense tracking
│   │   ├── CaretakersPage.jsx     # Caretaker management
│   │   ├── RemindersPage.jsx      # Reminder management
│   │   ├── SettingsPage.jsx       # Application settings
│   │   └── ProfilePage.jsx        # User profile
│   ├── services/        # API service layer (14 services)
│   │   ├── plotsService.js     # Plot management API
│   │   ├── cropsService.js     # Crop management API
│   │   ├── fertilizerService.js # Fertilizer API
│   │   ├── pesticideService.js  # Pesticide API
│   │   ├── irrigationService.js  # Irrigation API
│   │   ├── expensesService.js    # Expense API
│   │   ├── caretakersService.js  # Caretaker API
│   │   ├── reminderService.js    # Reminder API
│   │   └── weatherService.js     # Weather API
│   ├── utils/           # Utility functions
│   │   ├── formatters.js # Data formatting utilities
│   │   └── validators.js # Form validation utilities
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── index.js         # Application entry point
├── package.json
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md
```

### **🎯 Component Architecture**

#### **1. Dashboard (Main Container)**
- **Responsibility**: Layout and data orchestration
- **Features**: Error handling, loading states, action handlers
- **Benefits**: Clean separation of concerns

#### **2. PlotCard (Reusable Card)**
- **Responsibility**: Individual plot display
- **Features**: Status badges, action buttons, responsive design
- **Benefits**: Highly reusable, configurable

#### **3. SummaryCard (Statistics)**
- **Responsibility**: Display summary statistics
- **Features**: Dynamic colors, left border accents
- **Benefits**: Consistent styling, easy to extend

#### **4. WeatherCard (Weather Info)**
- **Responsibility**: Weather updates display
- **Features**: Warning styling, humidity/rain info
- **Benefits**: Standalone, reusable component

### **🔧 Key Improvements Made**

#### **Code Organization**
- ✅ **Separated concerns** into focused components
- ✅ **Extracted constants** for easy maintenance
- ✅ **Created custom hooks** for data management
- ✅ **Added PropTypes** for better type safety

#### **Reusability**
- ✅ **Modular components** that can be used elsewhere
- ✅ **Configuration-driven** design
- ✅ **Consistent styling** across components
- ✅ **Action handlers** for easy integration

#### **Maintainability**
- ✅ **Clean, readable code** structure
- ✅ **Centralized configuration** management
- ✅ **Error handling** with user feedback
- ✅ **Loading states** for better UX

#### **Performance**
- ✅ **Optimized re-renders** with proper key props
- ✅ **Efficient data fetching** with Promise.all
- ✅ **Lazy loading** ready for future implementation

### **🎨 Design Features**

#### **Visual Consistency**
- **Left Border Accents**: Colored borders for visual hierarchy
- **Professional Icons**: SVG icons instead of emojis
- **Responsive Grid**: Mobile-first design approach
- **Status Badges**: Dynamic colors for different states

#### **Status System**
- **🌱 Growing**: Green styling for active crops
- **⚡ Ready**: Yellow styling for harvest-ready crops
- **🌱 Planted**: Blue styling for newly planted crops

### **📱 Mobile Compatibility**
- **Responsive Grid**: 2 columns on mobile, 4 on desktop
- **Touch-Friendly**: Proper button sizes and spacing
- **Fixed Navigation**: Bottom navigation for easy access
- **Flexible Layout**: Cards stack properly on small screens

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FMS/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Configure the API endpoint:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_WEATHER_API_KEY=your_weather_api_key
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔌 API Integration

### Service Layer Architecture
The frontend uses a service-based architecture for API communication:

- **Service Classes**: Each feature has dedicated service (plotsService.js, cropsService.js, etc.)
- **Error Handling**: Graceful fallbacks with user-friendly error messages
- **Loading States**: Consistent loading indicators across all components
- **Data Caching**: Local storage for offline functionality
- **Mock Data**: Fallback data for development without backend

### API Endpoints Used
```javascript
// Example API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Plots
GET /plots
POST /plots
PUT /plots/:id
DELETE /plots/:id

// Crops
GET /crops
POST /crops
PUT /crops/:id

// Resources
GET /fertilizers
POST /fertilizers
GET /pesticides
POST /pesticides
GET /irrigation
POST /irrigation
GET /expenses
POST /expenses

// Reminders
GET /reminders
POST /reminders
PUT /reminders/:id/done
```

## 📱 Mobile Responsiveness

### Design Approach
- **Mobile-First**: Design starts with mobile layout
- **Responsive Grid**: Adapts from 1 column (mobile) to 4 columns (desktop)
- **Touch-Friendly**: Appropriate button sizes and spacing
- **Bottom Navigation**: Easy thumb reach on mobile devices
- **Flexible Layouts**: Cards stack properly on small screens

### Breakpoints
- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: > 1024px (4 column grid)

## 🎨 UI Components

### Card System
- **PlotCard**: Displays individual plot information with status badges
- **SummaryCard**: Shows farm statistics with colored accents
- **WeatherCard**: Displays weather information with warning styling
- **ActionCard**: Provides action buttons and quick access

### Status System
```javascript
const STATUS_CONFIG = {
  growing: { color: 'green', label: 'Growing', icon: '🌱' },
  harvested: { color: 'yellow', label: 'Harvested', icon: '🌾' },
  planting: { color: 'blue', label: 'Planting', icon: '🌱' }
};
```

### Navigation
- **Header**: Application title and user profile
- **Footer Navigation**: Bottom navigation with main sections
- **Breadcrumb Navigation**: Contextual navigation within pages

## 🧪 Testing

### Available Scripts
```bash
npm test          # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:watch     # Watch mode for development
```

### Testing Strategy
- **Unit Tests**: Component testing with Jest and React Testing Library
- **Integration Tests**: API service testing
- **E2E Tests**: Critical user journey testing (planned)

## 📈 Performance Optimization

### Techniques Used
- **Code Splitting**: Lazy loading of components
- **Optimized Renders**: Proper key props and memoization
- **Bundle Analysis**: Regular bundle size monitoring
- **Image Optimization**: Compressed images and lazy loading
- **Caching Strategy**: Local storage for frequently accessed data

## 🔧 Configuration

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#3b82f6',
        danger: '#ef4444'
      }
    }
  }
};
```

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WEATHER_API_KEY=your_api_key
REACT_APP_APP_NAME=FMS - Farm Management System
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS S3 + CloudFront
- **Server**: Nginx + PM2

### Build Optimization
- **Minification**: Automatic code minification
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization

## 🤝 Contributing

### Development Guidelines
1. **Follow React Best Practices**
2. **Use Functional Components** with hooks
3. **Add PropTypes** for type safety
4. **Maintain Component Consistency**
5. **Test on Mobile Devices**
6. **Update Documentation**

### Code Style
- **Components**: PascalCase
- **Files**: camelCase for utilities, PascalCase for components
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase

### Pull Request Process
1. Create feature branch
2. Make changes following guidelines
3. Add tests if applicable
4. Update documentation
5. Submit pull request

## 📝 Future Roadmap

### Phase 1 - Q1 2025
- [ ] **Real-time Updates**: WebSocket integration for live data
- [ ] **Offline Support**: Service worker implementation
- [ ] **Advanced Filtering**: Search and filter capabilities
- [ ] **Data Export**: CSV/PDF export functionality

### Phase 2 - Q2 2025
- [ ] **User Authentication**: Multi-user support with roles
- [ ] **Analytics Dashboard**: Advanced farm analytics
- [ ] **Mobile App**: React Native mobile application
- [ ] **IoT Integration**: Sensor data integration

### Technical Improvements
- [ ] **Storybook**: Component documentation and testing
- [ ] **Performance Monitoring**: Real user monitoring
- [ ] **Accessibility**: WCAG 2.1 compliance
- [ ] **Internationalization**: Multi-language support

---

**Built with ❤️ for modern farm management**

### **📋 Code Standards**

#### **Naming Conventions**
- **Components**: PascalCase (e.g., `PlotCard`)
- **Files**: PascalCase for components, camelCase for utilities
- **Constants**: UPPER_SNAKE_CASE (e.g., `STATUS_CONFIG`)
- **Functions**: camelCase (e.g., `handleWater`)

#### **Component Structure**
```jsx
// 1. Imports
import React from 'react';
import PropTypes from 'prop-types';

// 2. Constants/Config
const COMPONENT_CONFIG = { /* ... */ };

// 3. Sub-components
const SubComponent = ({ prop }) => ( /* ... */ );

// 4. Main component
const MainComponent = ({ prop1, prop2 }) => {
  // Logic here
  return ( /* JSX */ );
};

// 5. PropTypes
MainComponent.propTypes = { /* ... */ };

// 6. Export
export default MainComponent;
```

### **🤝 Contributing**

1. **Follow the established patterns**
2. **Add PropTypes** for new components
3. **Update constants** for new configurations
4. **Test on mobile** devices
5. **Maintain consistent styling**

---

**Built with ❤️ for modern farm management**
