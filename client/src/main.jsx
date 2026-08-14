/**
 * ============================================
 * ENTRY POINT - APPLICATION BOOTSTRAP
 * ============================================
 * This is where the React application starts.
 * It sets up React Router and mounts the app to the DOM.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecordList from './components/RecordList.jsx'
import Record from './components/Record.jsx'
import './index.css'
import App from './App.jsx'

/**
 * ===== ROUTER CONFIGURATION =====
 * Defines all the routes (pages) in the application
 * 
 * ROUTE STRUCTURE:
 * /                    → Shows App component with RecordList (employee table)
 *   ├─ / (exact)       → RecordList component
 *   ├─ /create         → Record component (create new employee)
 *   └─ /edit/:id       → Record component (edit existing employee with given ID)
 */
const router = createBrowserRouter([
  {
    // Root path - displays the App component (navbar + Outlet)
    path: '/',
    element: <App />,
    
    // Child routes - these components render inside the Outlet
    children: [
      // Default route: show the list of all employees
      { index: true, element: <RecordList /> },
      
      // Create route: show form to create new employee
      { path: 'create', element: <Record /> },
      
      // Edit route: show form to edit employee (with :id parameter)
      // :id is a dynamic parameter that can be any employee's MongoDB ID
      { path: 'edit/:id', element: <Record /> },
    ],
  },
])

/**
 * ===== REACT STARTUP =====
 * 1. Find the HTML element with id="root" (in index.html)
 * 2. Create a React root there
 * 3. Mount the application with StrictMode for development warnings
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* RouterProvider enables React Router functionality */}
    <RouterProvider router={router} />
  </StrictMode>,
)
