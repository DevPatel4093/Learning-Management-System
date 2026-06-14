import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2>LMS</h2>

      <Link to="#">
        Dashboard
      </Link>

      <Link to="/my-courses">
        My Courses
      </Link>

      <Link to="/progress">
        Progress
        </Link>

      <Link to="#">
        Certificates
      </Link>

      <Link to="#">
        Profile
      </Link>

      <Link to="/login">
        Logout
      </Link>

    </div>

  );

}

export default Sidebar;