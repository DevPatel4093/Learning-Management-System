import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function TakeQuiz() {

  const { courseId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {

    fetchQuiz();

  }, []);

  const fetchQuiz = async () => {

    try {

      const res = await API.get(
        `/quizzes/course/${courseId}`
      );

      setQuiz(res.data);

      setAnswers(
        new Array(
          res.data.questions.length
        ).fill("")
      );

    } catch (error) {

      console.log(error);

      alert("Quiz not found");

    }

  };

  const handleAnswerChange = (
    questionIndex,
    answerIndex
  ) => {

    const updatedAnswers =
      [...answers];

    updatedAnswers[
      questionIndex
    ] = answerIndex;

    setAnswers(
      updatedAnswers
    );

  };

  const submitQuiz = async () => {

    try {

      const res =
        await API.post(
          "/quizzes/submit",
          {
            quizId: quiz._id,
            answers
          }
        );

      setResult(
        res.data
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to submit quiz"
      );

    }

  };

  if (!quiz) {

    return <h2>Loading Quiz...</h2>;

  }

  return (

    <div className="page-container">

      <div className="lesson-form-card">

        <h1>{quiz.title}</h1>

        {quiz.questions.map(
          (q, index) => (

            <div
              key={index}
              style={{
                marginBottom: "25px"
              }}
            >

              <h3>
                {index + 1}.
                {" "}
                {q.question}
              </h3>

              {q.options.map(
                (
                  option,
                  optionIndex
                ) => (

                  <div
                    key={optionIndex}
                  >

                    <label>

                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        checked={
                          answers[index]
                          === optionIndex
                        }
                        onChange={() =>
                          handleAnswerChange(
                            index,
                            optionIndex
                          )
                        }
                      />

                      {" "}
                      {option}

                    </label>

                  </div>

                )
              )}

            </div>

          )
        )}

        <button
          className="enroll-btn"
          onClick={submitQuiz}
        >
          Submit Quiz
        </button>

        {result && (

          <div
            style={{
              marginTop: "30px"
            }}
          >

            <h2>
              Score:
              {" "}
              {result.score}%
            </h2>

            <h2>
              Status:
              {" "}
              {result.passed
                ? "PASSED ✅"
                : "FAILED ❌"}
            </h2>

          </div>

        )}

      </div>

    </div>

  );

}

export default TakeQuiz;