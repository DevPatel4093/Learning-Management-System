import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function CourseLessons() {

  const { courseId } = useParams();
console.log(courseId);

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
        `/lessons/student/${courseId}`
      );
console.log(res.data);

      setLessons(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const markComplete =
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
        "Failed"
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

            {lesson.videoUrl && (

              <video
                controls
                width="100%"
                style={{
                  marginTop: "15px"
                }}
              >

                <source
                  src={lesson.videoUrl}
                />

              </video>

            )}
            <button
              className="enroll-btn"
              onClick={() =>
                markComplete(
                  lesson._id
                )
              }
            >
              Mark Complete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default CourseLessons;