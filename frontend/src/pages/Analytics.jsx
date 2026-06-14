import { useEffect, useState } from "react";
import API from "../services/api";

function Analytics() {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
  async () => {

    try {

      const res =
      await API.get(
        "/analytics/admin"
      );

      setData(res.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load analytics"
      );

    }

  };

  if (!data) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="page-container">

      <h1>LMS Analytics</h1>

      <div className="courses-grid">

        <div className="analytics-card">
          <h2>Total Users</h2>
          <p>{data.totalUsers}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Students</h2>
          <p>{data.totalStudents}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Instructors</h2>
          <p>{data.totalInstructors}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Courses</h2>
          <p>{data.totalCourses}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Enrollments</h2>
          <p>{data.totalEnrollments}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Revenue</h2>
          <p>₹{data.totalRevenue}</p>
        </div>

      </div>

    </div>

  );

}

export default Analytics;