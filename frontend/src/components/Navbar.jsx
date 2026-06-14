import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        LMS
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/create-quiz">Create Quiz</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/instructor-dashboard">Instructor Dashboard</Link>
        <Link to="/admin-dashboard">Admin</Link>
        <Link to="/payment-history">Payments</Link>
      </div>
    </nav>
  );
}

export default Navbar;