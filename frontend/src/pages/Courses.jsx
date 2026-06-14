import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Courses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const res = await API.get("/courses");

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="page-container">

      <h1>All Courses</h1>

      <div className="courses-grid">

        {courses.map((course) => (

          <div
            key={course._id}
            className="course-card"
          >

            <h2>{course.title}</h2>

            <p>{course.description}</p>

            <h3>₹{course.price}</h3>

            <Link
              to={`/courses/${course._id}`}
              className="course-btn"
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Courses;