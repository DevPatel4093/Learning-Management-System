import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Lessons() {

  const { courseId } = useParams();

  const [lessons, setLessons] =
    useState([]);

  useEffect(() => {

    fetchLessons();

  }, []);

  const fetchLessons =
  async () => {

    try {

      const res =
      await API.get(
        `/lessons/course/${courseId}`
      );

      setLessons(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const completeLesson =
  async (lessonId) => {

    try {

      const res =
      await API.post(
        "/progress/complete",
        {
          lessonId
        }
      );

      alert(
        res.data.message
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to complete lesson"
      );

    }

  };

  return (

    <div className="page-container">

      <h1>
        Course Lessons
      </h1>

      <div className="courses-grid">

        {lessons.map((lesson) => (

          <div
            key={lesson._id}
            className="course-card"
          >

            <h2>
              {lesson.title}
            </h2>

            <p>
              {lesson.content}
            </p>

            <button
              className="enroll-btn"
              onClick={() =>
                completeLesson(
                  lesson._id
                )
              }
            >
              Complete Lesson
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Lessons;