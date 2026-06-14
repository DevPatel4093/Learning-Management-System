import { Link } from "react-router-dom";

function InstructorDashboard() {

  return (

    <div className="page-container">

      <div className="dashboard-card">

        <h1>
          Instructor Dashboard
        </h1>

        <div className="dashboard-actions">

          <Link
            to="/create-course"
            className="dashboard-btn"
          >
            Create Course
          </Link>

          <Link
            to="/create-lesson"
            className="dashboard-btn"
          >
            Create Lesson
          </Link>

          <Link
            to="/create-quiz"
            className="dashboard-btn"
          >
            Create Quiz
          </Link>

          <Link
            to="/upload-video"
            className="dashboard-btn"
          >
            Upload Video
          </Link>

          <Link
            to="/analytics"
            className="dashboard-btn"
          >
            Analytics
          </Link>

          <Link
                to="/instructor-courses"
                className="dashboard-btn"
                >
                My Courses
                </Link>

        </div>

      </div>

    </div>

  );

}

export default InstructorDashboard;