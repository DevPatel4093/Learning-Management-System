import { useState } from "react";
import API from "../services/api";

function CreateQuiz() {

  const [formData, setFormData] = useState({

  title: "",
  course: "",
  passingScore: "",

  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",

  correctAnswer: ""

});

const [questions, setQuestions] = useState([
  {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: ""
  }
]);

const addQuestion = () => {

  setQuestions([
    ...questions,
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: ""
    }
  ]);

};
  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
  "/quizzes",
  {
    title: formData.title,
    course: formData.course,
    passingScore: Number(formData.passingScore),

    questions: [
      {
        question: formData.question,

        options: [
          formData.option1,
          formData.option2,
          formData.option3,
          formData.option4
        ],

        correctAnswer:
          Number(formData.correctAnswer)
      }
    ]
  }
);

      alert(
        "Quiz Created Successfully"
      );

      setFormData({

        course: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: ""

      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create quiz"
      );

    }

  };

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>Create Quiz</h1>

        <form onSubmit={handleSubmit}>

            <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={formData.title}
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
                name="passingScore"
                placeholder="Passing Score"
                value={formData.passingScore}
                onChange={handleChange}
                />
                
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={formData.question}
            onChange={handleChange}
          />

          <input
            type="text"
            name="option1"
            placeholder="Option 1"
            value={formData.option1}
            onChange={handleChange}
          />

          <input
            type="text"
            name="option2"
            placeholder="Option 2"
            value={formData.option2}
            onChange={handleChange}
          />

          <input
            type="text"
            name="option3"
            placeholder="Option 3"
            value={formData.option3}
            onChange={handleChange}
          />

          <input
            type="text"
            name="option4"
            placeholder="Option 4"
            value={formData.option4}
            onChange={handleChange}
          />

          <input
            type="text"
            name="correctAnswer"
            placeholder="Correct Answer"
            value={formData.correctAnswer}
            onChange={handleChange}
          />

        
          <button type="submit">
            Create Quiz
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateQuiz;