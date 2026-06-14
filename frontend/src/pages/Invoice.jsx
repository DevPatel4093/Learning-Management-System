import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Invoice() {

  const { paymentId } =
    useParams();

  const [invoice, setInvoice] =
    useState(null);

  useEffect(() => {

    fetchInvoice();

  }, []);

  const fetchInvoice =
  async () => {

    try {

      const res =
      await API.get(
        `/payments/invoice/${paymentId}`
      );

      setInvoice(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!invoice) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Invoice
        </h1>

        <h3>
          Invoice No:
          {invoice.invoiceNumber}
        </h3>

        <p>
          Student:
          {invoice.student?.name}
        </p>

        <p>
          Email:
          {invoice.student?.email}
        </p>

        <p>
          Course:
          {invoice.course?.title}
        </p>

        <p>
          Amount:
          ₹{invoice.amount}
        </p>

        <p>
          Status:
          {invoice.status}
        </p>

        <p>
          Payment ID:
          {invoice.paymentId}
        </p>

      </div>

    </div>

  );

}

export default Invoice;