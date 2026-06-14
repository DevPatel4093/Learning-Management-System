import {
  Routes,
  Route
}
from "react-router-dom";

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Register from "../pages/Register";

import StudentDashboard
from "../pages/StudentDashboard";

import ProtectedRoute
from "../components/ProtectedRoute";

import MyCourses
from "../pages/MyCourses";

import CourseDetails
from "../pages/CourseDetails";

import Notifications from "../pages/Notifications";

import Progress
from "../pages/Progress";

import Lessons from "../pages/Lessons";

import CreateLesson
from "../pages/CreateLesson";

import CourseLessons from "../pages/CourseLessons";

import CreateQuiz from "../pages/CreateQuiz";

import TakeQuiz from "../pages/TakeQuiz";

import MyCertificates from "../pages/MyCertificates";

import AddReview from "../pages/AddReview";

import Analytics from "../pages/Analytics";

import Payment from "../pages/Payment";

import UploadVideo
from "../pages/UploadVideo";

import InstructorDashboard
from "../pages/InstructorDashboard";

import CreateCourse from "../pages/CreateCourse";

import EditCourse
from "../pages/EditCourse";

import AdminDashboard
from "../pages/AdminDashboard";

import Reports from "../pages/Reports";

import PaymentHistory from "../pages/PaymentHistory";
import Invoice from "../pages/Invoice";

import InstructorCourses
from "../pages/InstructorCourses";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/courses"
        element={<Courses />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={

          <ProtectedRoute>

            <StudentDashboard />

          </ProtectedRoute>

        }
      />

        <Route
            path="/my-courses"
            element={
                <ProtectedRoute>
                <MyCourses />
                </ProtectedRoute>
            }
            />

         <Route
            path="/courses/:id"
            element={<CourseDetails />}
            />

        <Route
            path="/notifications"
            element={<Notifications />}
            />

        <Route
            path="/progress"
            element={<Progress />}
            />

        <Route
            path="/lessons/:courseId"
            element={<Lessons />}
            />

        <Route
            path="/create-lesson"
            element={<CreateLesson />}
            />

        <Route
            path="/course-lessons/:courseId"
            element={<CourseLessons />}
            />

        <Route
            path="/create-quiz"
            element={<CreateQuiz />}
            />

        <Route
            path="/quiz/:courseId"
            element={<TakeQuiz />}
            />

        <Route
            path="/certificate/:courseId"
            element={<MyCertificates />}
          />

          <Route
            path="/review/:courseId"
            element={<AddReview />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/payment/:courseId"
            element={<Payment />}
          />

          <Route
            path="/upload-video"
            element={<UploadVideo />}
          />

          <Route
            path="/instructor-dashboard"
            element={<InstructorDashboard />}
          />

          <Route
            path="/create-course"
            element={<CreateCourse />}
          />

          <Route
            path="/instructor-courses"
            element={<InstructorCourses />}
          />

          <Route
            path="/edit-course/:id"
            element={<EditCourse />}
          />

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/payment-history"
            element={<PaymentHistory />}
          />

          <Route
            path="/invoice/:paymentId"
            element={<Invoice />}
          />
    </Routes>

  );

}

export default AppRoutes;