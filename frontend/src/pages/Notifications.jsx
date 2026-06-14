import { useEffect, useState } from "react";
import API from "../services/api";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
  async () => {

    try {

      const res =
      await API.get(
        "/notifications"
      );

      setNotifications(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="page-container">

      <h1>
        Notifications
      </h1>

      <div className="courses-grid">

        {notifications.map((notification) => (

          <div
            key={notification._id}
            className="course-card"
          >

            <h3>
              {notification.title}
            </h3>

            <p>
              {notification.message}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Notifications;