import { useParams } from "react-router-dom";
import API from "../services/api";

function Payment() {

  const { courseId } = useParams();

  const handlePayment = async () => {

    try {

      const res =
      await API.post(
        "/payments/create-order",
        {
          courseId
        }
      );

      const order =
      res.data.order;
      const options = {

        key:
        "rzp_test_T0erdnwoBkfUVl",

        amount:
        order.amount,

        currency:
        order.currency,

        name:
        "LMS Platform",

        description:
        "Course Payment",

        order_id:
        order.id,

        handler:
        async function(response) {

          try {

            const verifyRes =
            await API.post(
              "/payments/verify",
              response
            );

            alert(
              verifyRes.data.message
            );

          } catch (error) {

            alert(
              "Verification Failed"
            );

          }

        }

      };

      const rzp =
      new window.Razorpay(
        options
      );

      rzp.open();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Course Payment
        </h1>

        <button
          onClick={handlePayment}
        >
          Pay Now
        </button>

      </div>

    </div>

  );

}

export default Payment;