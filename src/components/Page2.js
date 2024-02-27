import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';

function Page2() {
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    // Calculate correct and incorrect counts
    let correct = 0;
    let incorrect = 0;

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const timeTakenInSeconds = 5 * 60 - timer;

    // Redirect to Page3 with data
    navigate('/Page3', {
      state: {
        questions,
        userAnswers,
        correctCount: correct,
        incorrectCount: incorrect,
        timeTaken: timeTakenInSeconds,
      },
    });

    // Set quizSubmitted to true to prevent further automatic submissions
    setQuizSubmitted(true);
  }, [navigate, questions, timer, userAnswers]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !quizSubmitted) {
        // Automatically submit when tab becomes hidden
        handleSubmit();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quizSubmitted, handleSubmit]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // Automatically submit when the timer reaches 0
          handleSubmit();
          return prevTimer;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [handleSubmit]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-800 text-white p-4 md:p-8">
    <div className="bg-gray-900 rounded-lg p-8 w-full  shadow-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-yellow-300 ">🚀 React Quiz 🚀</h2>
      <div className="mb-6 text-right text-gray-100">
        Time Remaining: {formatTime(timer)}
      </div>
      {questions.map((questionObj, index) => (
        <div key={index} className="mb-6">
          <p className="mb-3 text-lg text-gray-100">{index + 1}. {questionObj.question}</p>
          {questionObj.options.map((option, optionIndex) => (
            <label
              key={optionIndex}
              className={`flex items-center space-x-2 cursor-pointer mb-2 group ${userAnswers[index] === option ? 'text-blue-500' : ''}`}
            >
              <input
                type="radio"
                name={`question_${index}`}
                value={option}
                checked={userAnswers[index] === option}
                onChange={() => handleAnswerChange(index, option)}
                disabled={quizSubmitted}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="text-gray-300 ">{option}</span>
            </label>
          ))}
        </div>
      ))}
      {!quizSubmitted && (
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
        >
          Submit
        </button>
      )}
    </div>
  </div>
);
}

export default Page2;