# AdminPro - Professional React Dashboard

A comprehensive, feature-rich, and professionally designed admin dashboard built with React, Vite, and Tailwind CSS. This enterprise-grade dashboard provides a modern, responsive, and highly customizable interface for managing complex data, tasks, and business operations.

## ✨ Professional Features

### 🎨 **Enhanced Design System**
-   **Professional Color Palette**: Carefully crafted color scheme with CSS variables for consistent branding
-   **Glass Morphism Effects**: Modern backdrop-blur and translucent elements for a premium feel
-   **Advanced Typography**: Custom gradients, professional font stacks, and hierarchical text styling
-   **Micro-animations**: Smooth transitions, hover effects, and loading states for enhanced UX
-   **Professional Shadows**: Multi-layered shadow system for depth and visual hierarchy

### 📊 **Interactive Dashboard**
-   **Real-time Data Visualization**: Dynamic charts with filtering by time periods (7, 30, 90 days)
-   **Professional Stat Cards**: Enhanced cards with gradients, icons, and trend indicators
-   **Interactive Charts**: Line, Area, Bar, and Pie charts with tooltips and responsive design
-   **Quick Stats Panel**: Live metrics with color-coded indicators and trend analysis
-   **Activity Feed**: Real-time user activity with avatars and action indicators

### 🗂️ **Advanced Data Tables**
-   **Professional Styling**: Modern card-based design with hover effects and animations
-   **Advanced Search & Filtering**: Real-time search with highlighted results
-   **Column Management**: Show/hide columns with an intuitive column selector
-   **Bulk Operations**: Multi-select functionality with bulk actions (delete, edit)
-   **Export Functionality**: CSV export with customizable column selection
-   **Smart Pagination**: Page navigation with page numbers and items-per-page selector
-   **Row Actions**: Edit and delete actions with professional icons and tooltips
-   **Responsive Design**: Mobile-optimized table with horizontal scrolling

### 🎨 **Professional UI Components**
-   **Enhanced Header**: 
     - Global search with focus states and animations
     - Professional user dropdown with profile management
     - Interactive notifications panel with unread indicators
     - Theme toggle with smooth transitions
-   **Improved Sidebar**:
     - Collapsible design with professional branding
     - Colored icons and badge indicators
     - Upgrade promotion section
     - Smooth animations and hover effects
-   **Notification System**:
     - Toast notifications with multiple types (success, error, warning, info)
     - Auto-dismiss with configurable duration
     - Professional styling with icons and animations
-   **Breadcrumb Navigation**: Contextual navigation with home icon and route mapping

### 📅 **Full-Featured Calendar**
-   **Interactive Event Management**: Add, view, and delete events with modal interfaces
-   **Professional Month View**: Clean grid layout with event indicators
-   **Event Details**: Detailed event display with professional styling
-   **Responsive Design**: Mobile-optimized calendar interface

### 📋 **Enhanced Kanban Board**
-   **Drag-and-Drop Interface**: Smooth task movement between columns
-   **Task Management**: Create, edit, delete, and organize tasks
-   **Professional Cards**: Modern task cards with hover effects
-   **Column Organization**: Multiple status columns with visual indicators

### 🎯 **Theme System**
-   **Seamless Dark/Light Mode**: Professional theme switching with system preference detection
-   **Consistent Theming**: All components adapt to theme changes with smooth transitions
-   **Professional Colors**: Carefully selected colors that work in both themes
-   **Accessibility**: High contrast ratios and WCAG compliance

### 🔧 **Professional Settings**
-   **User Profile Management**: Comprehensive user settings and preferences
-   **Theme Preferences**: Advanced theme customization options
-   **Data Management**: Import/export functionality and data preferences

## 🚀 Technologies Used

-   **Framework**: [React 19](https://reactjs.org/) with modern hooks and context
-   **Build Tool**: [Vite 6](https://vitejs.dev/) for lightning-fast development
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom design system
-   **Routing**: [React Router 7](https://reactrouter.com/) for seamless navigation
-   **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography
-   **Charts**: [Recharts](https://recharts.org/) for interactive data visualization
-   **Drag & Drop**: [@dnd-kit](https://dndkit.com/) for smooth interactions
-   **Date Management**: [date-fns](https://date-fns.org/) for robust date handling
-   **UI Components**: [Headless UI](https://headlessui.dev/) for accessible components

## ⚙️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Ayush-Raj-0304/assignment-w3.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd assignment-w3
    ```
3.  **Install the dependencies:**
    ```sh
    npm install
    ```

### Running the Application

To start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```

## 📜 Available Scripts

-   `npm run dev`: Starts the development server with hot reload
-   `npm run build`: Builds the application for production with optimizations
-   `npm run lint`: Lints the project files using ESLint
-   `npm run preview`: Serves the production build locally for testing

## 📂 Project Structure

```
/src
├── /assets                 # Static assets and images
├── /components            # Reusable UI components
│   ├── Breadcrumbs.jsx   # Navigation breadcrumbs
│   ├── DataTable.jsx     # Advanced data table with export/filtering
│   ├── Header.jsx        # Enhanced header with dropdowns
│   ├── NotificationSystem.jsx # Toast notification system
│   └── Sidebar.jsx       # Professional sidebar navigation
├── /pages                # Main application pages
│   ├── Calendar.jsx      # Interactive calendar with events
│   ├── Charts.jsx        # Data visualization charts
│   ├── Dashboard.jsx     # Main dashboard with widgets
│   ├── Kanban.jsx        # Drag-and-drop task board
│   ├── Settings.jsx      # User preferences and settings
│   └── Tables.jsx        # Enhanced data table page
├── App.jsx               # Root application component
├── index.css             # Global styles and design system
└── main.jsx              # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`#3B82F6` to `#1D4ED8`)
- **Success**: Green gradient (`#10B981` to `#059669`)
- **Warning**: Orange gradient (`#F59E0B` to `#D97706`)
- **Error**: Red gradient (`#EF4444` to `#DC2626`)

### Typography
- **Primary Font**: Inter with fallbacks to system fonts
- **Gradient Text**: Custom CSS classes for branded text
- **Hierarchy**: Consistent sizing and weights for visual hierarchy

### Animations
- **Fade In**: Smooth element entrance animations
- **Slide Up**: Content reveal animations
- **Scale In**: Modal and dropdown animations
- **Hover Lift**: Interactive element hover effects

## 🔧 Customization

### Theme Customization
The application uses CSS variables for easy theme customization. Update the values in `src/index.css`:

```css
:root {
  --primary-500: #your-color;
  --success-500: #your-color;
  /* Add your custom colors */
}
```

### Component Styling
All components use Tailwind classes with theme-aware styling. The design system ensures consistency across all themes.

## 📱 Responsive Design

-   **Mobile-First Approach**: Designed for mobile devices and scaled up
-   **Breakpoints**: Responsive design with Tailwind's breakpoint system
-   **Touch-Friendly**: Optimized for touch interactions on mobile devices
-   **Performance**: Optimized loading and rendering for all device types

## 🔐 Features Overview

### Dashboard
- Real-time metrics and KPIs
- Interactive charts with date filtering
- Recent activity feed
- Quick stats overview
- Professional animations and transitions

### User Management
- Advanced data table with search and filtering
- Bulk operations for multiple users
- Export functionality (CSV)
- Column visibility controls
- Professional user avatars and status indicators

### Data Visualization
- Multiple chart types (Line, Area, Bar, Pie)
- Interactive tooltips and legends
- Responsive chart design
- Professional color schemes

### Task Management
- Drag-and-drop Kanban board
- Task creation and editing
- Status tracking
- Professional card design

### Calendar
- Month view with event management
- Add/edit/delete events
- Professional modal interfaces
- Responsive calendar grid

## 🌟 Professional Grade Features

- **Enterprise-Ready**: Built with scalability and maintainability in mind
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized bundle size and lazy loading
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Type Safety**: JSDoc comments for better development experience
- **Error Handling**: Graceful error handling with user feedback
- **Security**: Best practices for client-side security

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React and Vite for optimal performance
- Styled with Tailwind CSS for rapid development
- Icons provided by Lucide React
- Charts powered by Recharts
- Professional design inspired by leading dashboard solutions

---

**AdminPro** - Elevating admin dashboards to professional standards with modern React and beautiful design.