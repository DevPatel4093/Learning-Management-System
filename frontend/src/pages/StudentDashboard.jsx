import { useEffect, useState } from "react";

import API from "../services/api";

import Sidebar
from "../components/dashboard/Sidebar";

import DashboardCard
from "../components/dashboard/DashboardCard";

import "./StudentDashboard.css";

function StudentDashboard() {

  const [dashboardData,
    setDashboardData] =
    useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
  async () => {

    try {

      const res =
      await API.get(
        "/dashboard/student"
      );

      setDashboardData(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!dashboardData) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <h1>
          Student Dashboard
        </h1>

        <div className="cards-grid">

          <DashboardCard
            title="Courses Enrolled"
            value={
              dashboardData.totalCoursesEnrolled
            }
          />

          <DashboardCard
            title="Certificates"
            value={
              dashboardData.certificatesEarned
            }
          />

          <DashboardCard
            title="Enrolled Courses"
            value={
              dashboardData.enrolledCourses.length
            }
          />

<Link
  to="/notifications"
  className="view-btn"
>
  Notifications
</Link>

<Link
  to="/analytics"
  className="view-btn"
>
  Analytics
</Link>

<Link
  to="/payment-history"
  className="dashboard-btn"
>
  Payment History
</Link>
        </div>

      </div>

    </div>

  );

}

export default StudentDashboard;