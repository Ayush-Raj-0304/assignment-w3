# React Admin Dashboard

This is a comprehensive and feature-rich admin dashboard built with React, Vite, and Tailwind CSS. It provides a modern, responsive, and customizable interface for managing data, tasks, and events, making it a perfect starting point for any admin-facing application.

## ✨ Features

-   **📊 Interactive Dashboard**: A dynamic overview with data-driven charts and statistics that can be filtered by a specific time period (e.g., last 7, 30, or 90 days).
-   **🎨 Customizable Themes**: Seamlessly switch between **light and dark modes** with theme-aware components that persist across sessions.
-   **🗂️ Advanced Data Tables**: A reusable data table component with built-in **sorting**, **filtering**, and **pagination** to handle large datasets efficiently.
-   **📅 Full-Featured Calendar**: An interactive calendar that allows users to **add, view, and delete events** on any given day.
-   **📋 Drag-and-Drop Kanban Board**: A Trello-like board for task management with support for **creating, editing, deleting, and moving tasks** between columns.
-   **📱 Responsive Design**: A mobile-first design that ensures a smooth user experience on all screen sizes, from mobile phones to desktops.
-   **Sidebar Navigation**: A collapsible sidebar for easy navigation between different pages.

## 🚀 Technologies Used

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
-   **Date Management**: [date-fns](https://date-fns.org/)
-   **UI Components**: [Headless UI](https://headlessui.dev/)

## ⚙️ Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd your-repo-name
    ```
3.  **Install the dependencies:**
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the project files.
-   `npm run preview`: Serves the production build locally.
-   `npm run test`: Runs the test suite.

## 📂 Project Structure

```
/src
|-- /assets
|-- /components
|   |-- DataTable.jsx
|   |-- Header.jsx
|   `-- Sidebar.jsx
|-- /pages
|   |-- Calendar.jsx
|   |-- Charts.jsx
|   |-- Dashboard.jsx
|   |-- Kanban.jsx
|   `-- Tables.jsx
|-- App.jsx
|-- index.css
`-- main.jsx
```

-   **/components**: Contains reusable components like the `Header`, `Sidebar`, and `DataTable`.
-   **/pages**: Contains the main pages of the application, such as `Dashboard`, `Tables`, and `Kanban`.
-   **App.jsx**: The main application component that handles routing and layout.