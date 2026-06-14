import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function PaymentHistory() {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  const fetchPayments =
  async () => {

    try {

      const res =
      await API.get(
        "/payments/history"
      );

      setPayments(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="page-container">

      <h1>
        Payment History
      </h1>

      <div className="courses-grid">

        {payments.map((payment) => (

          <div
            key={payment._id}
            className="course-card"
          >

            <h2>
              {payment.course?.title}
            </h2>

            <p>
              Amount:
              ₹{payment.amount}
            </p>

            <p>
              Status:
              {payment.status}
            </p>

            <Link
              to={`/invoice/${payment._id}`}
              className="view-btn"
            >
              View Invoice
            </Link>

          </div>

        ))}

      </div>

    </div>

  );

}

export default PaymentHistory;