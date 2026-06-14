import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function InstructorCourses() {

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses =
  async () => {

    try {

      const res =
      await API.get(
        "/courses/my-courses"
      );

      setCourses(
        res.data
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load courses"
      );

    }

  };

  const handleDelete =
async (courseId) => {

  const confirmDelete =
  window.confirm(
    "Delete this course?"
  );

  if (!confirmDelete) {

    return;

  }

  try {

    await API.delete(
      `/courses/${courseId}`
    );

    alert(
      "Course Deleted"
    );

    fetchCourses();

  } catch (error) {

    alert(
      error.response?.data?.message
    );

  }

};
  return (

    <div className="page-container">

      <h1>
        My Courses
      </h1>

      <div className="courses-grid">

        {courses.map((course) => (

          <div
            key={course._id}
            className="course-card"
          >

            <h2>
              {course.title}
            </h2>

            <p>
              {course.description}
            </p>

            <h3>
              ₹{course.price}
            </h3>

            <div className="course-actions">

              <Link
                to={`/courses/${course._id}`}
                className="view-btn"
              >
                View
              </Link>

              <Link
                to="/create-lesson"
                className="view-lessons-btn"
              >
                Lesson
              </Link>

              <Link
                to="/create-quiz"
                className="certificate-btn"
              >
                Quiz
              </Link>

              <Link
                to="/upload-video"
                className="payment-btn"
              >
                Video
              </Link>

                <Link
                    to={`/edit-course/${course._id}`}
                    className="payment-btn"
                    >
                    Edit
                    </Link>
                <button
                    className="complete-btn"
                    onClick={() =>
                        handleDelete(
                        course._id
                        )
                    }
                    >
                    Delete
                    </button>
            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default InstructorCourses;