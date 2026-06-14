import { useState } from "react";
import API from "../services/api";

function Progress() {

  const [courseId,
  setCourseId] =
  useState("");

  const [progressData,
    setProgressData] =
    useState(null);

  const fetchProgress =
  async () => {

    try {

      const res =
      await API.get(
        `/progress/${courseId}`
      );

      setProgressData(
        res.data
        );

    } catch (error) {

      console.log(error);

    }

  };

  return (
  <div className="page-container">

    <div className="progress-card">

      <h1>Course Progress</h1>

      <div className="progress-form">

        <input
          type="text"
          placeholder="Enter Course ID"
          value={courseId}
          onChange={(e) =>
            setCourseId(e.target.value)
          }
        />

        <button onClick={fetchProgress}>
          Check Progress
        </button>

      </div>

      {progressData && (

  <div className="progress-result">

    <h3>
      Progress: {progressData.progress}%
    </h3>

    <p>
      Completed Lessons:
      {progressData.completedLessons}
    </p>

    <p>
      Total Lessons:
      {progressData.totalLessons}
    </p>

  </div>

)}

    </div>

  </div>
);

}

export default Progress;