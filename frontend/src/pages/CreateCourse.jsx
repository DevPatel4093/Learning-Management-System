import { useState } from "react";
import API from "../services/api";

function CreateCourse() {

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      price: "",
      category: ""

    });

  const handleChange = (e) => {

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

      await API.post(
        "/courses",
        formData
      );

      alert(
        "Course Created Successfully"
      );

      setFormData({

        title: "",
        description: "",
        price: "",
        category: ""

      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create course"
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Create Course
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Course Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category ID"
            value={formData.category}
            onChange={handleChange}
          />

          <button
            type="submit"
          >
            Create Course
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateCourse;