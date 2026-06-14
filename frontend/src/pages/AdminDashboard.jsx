import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
function AdminDashboard() {

  const [analytics, setAnalytics] =
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

      setAnalytics(
        res.data
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load analytics"
      );

    }

  };

  if (!analytics) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="page-container">

      <h1>
        Admin Dashboard
      </h1>

      <div className="courses-grid">

        <div className="analytics-card">
          <h2>Total Users</h2>
          <p>{analytics.totalUsers}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Students</h2>
          <p>{analytics.totalStudents}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Instructors</h2>
          <p>{analytics.totalInstructors}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Courses</h2>
          <p>{analytics.totalCourses}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Enrollments</h2>
          <p>{analytics.totalEnrollments}</p>
        </div>

        <div className="analytics-card">
          <h2>Total Revenue</h2>
          <p>₹{analytics.totalRevenue}</p>
        </div>

        <Link
        to="/reports"
        className="dashboard-btn"
        >
        Reports
        </Link>

      </div>

    </div>

  );

}

export default AdminDashboard;