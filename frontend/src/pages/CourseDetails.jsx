import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";

function CourseDetails() {

  const { id } = useParams();

  const [course, setCourse] =
    useState(null);

  useEffect(() => {

    fetchCourse();

  }, []);

  const fetchCourse =
  async () => {

    try {

      const res =
      await API.get(
        `/courses/${id}`
      );

      setCourse(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleEnroll =
  async () => {

    try {

      await API.post(
        "/enrollments/enroll",
        {
          courseId: id
        }
      );

      alert(
        "Enrollment Successful"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Enrollment Failed"
      );

    }

  };

  if (!course) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="page-container">

  <div className="course-details">

    <h1>{course.title}</h1>

    <p>{course.description}</p>

    <h3>
      Price: ₹{course.price}
    </h3>

    <div className="course-actions">

      <button
        className="action-btn enroll-btn"
        onClick={handleEnroll}
      >
        Enroll Now
      </button>

      <Link
        to={`/course-lessons/${course._id}`}
        className="action-btn lesson-btn"
      >
        View Lessons
      </Link>

      <Link
        to={`/quiz/${course._id}`}
        className="action-btn quiz-btn"
      >
        Take Quiz
      </Link>

      <Link
        to={`/certificate/${course._id}`}
        className="action-btn certificate-btn"
      >
        Certificate
      </Link>

      <Link
        to={`/review/${course._id}`}
        className="action-btn review-btn"
      >
        Add Review
      </Link>

      <Link
        to={`/payment/${course._id}`}
        className="action-btn payment-btn"
      >
        Buy Course
      </Link>

    </div>

  </div>

</div>
  );

}

export default CourseDetails;