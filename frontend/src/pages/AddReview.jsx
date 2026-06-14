import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function AddReview() {

  const { courseId } = useParams();

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      await API.post(
        `/reviews/${courseId}`,
        {
          rating,
          comment
        }
      );

      alert("Review Added");

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>Add Review</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e)=>
              setRating(e.target.value)
            }
          />

          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e)=>
              setComment(e.target.value)
            }
          />

          <button type="submit">
            Submit Review
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddReview;