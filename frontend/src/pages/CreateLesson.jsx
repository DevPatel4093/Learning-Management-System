import { useState } from "react";
import API from "../services/api";

function CreateLesson() {

  const [formData, setFormData] =
    useState({

      title: "",
      content: "",
      course: ""

    });

    const [order, setOrder] =
  useState("");

  const handleChange =
  (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
  await API.post(
    "/lessons/create",
    {
      title: formData.title,
      content: formData.content,
      course: formData.course,
      order: Number(order)
    }
  );

      alert(
        "Lesson Created Successfully"
      );

      setFormData({

        title: "",
        content: "",
        course: ""

      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create lesson"
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Create Lesson
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Lesson Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Lesson Content"
            value={formData.content}
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Course ID"
            value={formData.course}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Lesson Order"
            value={order}
            onChange={(e) =>
                setOrder(e.target.value)
            }
            />
          <button
            type="submit"
          >
            Create Lesson
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateLesson;