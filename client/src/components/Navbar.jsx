/**
 * ============================================
 * NAVBAR COMPONENT
 * ============================================
 * Top navigation bar with logo and "Create Employee" button
 * Appears on every page
 */

import { NavLink } from "react-router-dom";

/**
 * Navbar Component
 * 
 * ELEMENTS:
 * 1. Logo/Home Link (MongoDB logo) → navigates to "/"
 * 2. "Create Employee" Button → navigates to "/create"
 * 
 * NavLink automatically adds active styling when the route matches
 */
export default function Navbar() {
  return (
    <div>
      {/* Navigation bar with flexbox for side-by-side layout */}
      <nav className="flex justify-between items-center mb-6">
        
        {/* LEFT SIDE: Logo linking to home page */}
        <NavLink to="/">
          {/* MongoDB logo from CDN */}
          <img
            alt="MongoDB logo"
            className="h-10 inline"
            src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"
          />
        </NavLink>

        {/* RIGHT SIDE: "Create Employee" button */}
        <NavLink
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to="/create"
        >
          Create Employee
        </NavLink>
      </nav>
    </div>
  );
}
