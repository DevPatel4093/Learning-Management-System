import { useEffect, useState } from "react";
import API from "../services/api";
import { Link }
from "react-router-dom";

function MyCourses() {

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
        "/enrollments/my-courses"
      );

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="page-container">

      <h1>
        My Courses
      </h1>

      <div className="courses-grid">

  {courses.map((item) => (

    <div
      key={item._id}
      className="course-card"
    >

      <Link
  to={`/courses/${item.course._id}`}
  className="course-link"
>
  {item.course.title}
</Link>


      <p>
        {item.course.description}
      </p>
<Link
  to={`/course-lessons/${item.course._id}`}
  className="view-btn"

>
  View Lessons
</Link>
    </div>

  ))}

</div>

        
      </div>

    

  );

}

export default MyCourses;