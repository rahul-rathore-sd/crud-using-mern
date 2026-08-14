/**
 * ============================================
 * APP - ROOT COMPONENT
 * ============================================
 * This is the root component of the React application.
 * It sets up the main layout structure with:
 * - Navbar at the top (navigation and buttons)
 * - Dynamic content area using React Router (Outlet)
 */

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

/**
 * App Component
 * 
 * STRUCTURE:
 * <div> (Full page container)
 *   ├─ <Navbar /> (Navigation bar with links and buttons)
 *   └─ <Outlet /> (Dynamic content area - changes based on current route)
 * 
 * HOW IT WORKS:
 * - Outlet is a React Router component that displays the current page's content
 * - When user navigates to "/", it shows RecordList component
 * - When user navigates to "/create", it shows Record component (create mode)
 * - When user navigates to "/edit/:id", it shows Record component (edit mode)
 */
const App = () => {
  return (
    <div className="w-full p-6">
      {/* Navbar contains the logo and "Create Employee" button */}
      <Navbar />
      
      {/* Outlet renders the current page's component here */}
      {/* This is where RecordList or Record component will appear */}
      <Outlet />
    </div>
  );
};

export default App;
