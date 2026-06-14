import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditCourse() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      price: "",
      category: ""

    });

  useEffect(() => {

    fetchCourse();

  }, []);

  const fetchCourse =
  async () => {

    try {

      const res =
      await API.get(
        `/courses/${id}`
      );

      setFormData({

        title:
        res.data.title || "",

        description:
        res.data.description || "",

        price:
        res.data.price || "",

        category:
        res.data.category?._id ||
        res.data.category ||
        ""

      });

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load course"
      );

    }

  };

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

      await API.put(
        `/courses/${id}`,
        formData
      );

      alert(
        "Course Updated Successfully"
      );

      navigate(
        "/instructor-courses"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>
          Edit Course
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
            Update Course
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditCourse;