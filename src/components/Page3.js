import React from "react";
import { useLocation } from "react-router-dom";

function Page3() {
  const location = useLocation();
  const { questions, userAnswers, correctCount, incorrectCount, timeTaken } = location.state;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-600 text-white">
      <div className="max-w-full flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-stretch w-full px-4 lg:px-0">
        <div className="flex flex-col mr-4 mb-8 lg:mb-0 lg:mr-8 w-[50%] bg-gray-900  items-center overflow-x-hidden">
          <h2 className="text-4xl font-bold mb-6 text-yellow-300 p-[1%]">Quiz Results</h2>
          <div className="bg-transparent p-6 rounded-lg shadow-md mb-2">
            <p className="text-lg font-semibold mb-2">Correct Answers: {correctCount}</p>
            <p className="text-lg font-semibold mb-2">Incorrect Answers: {incorrectCount}</p>
            <p className="text-lg font-semibold mb-2">Result Ratio: {correctCount}/{correctCount + incorrectCount}</p>
            <p className="text-lg font-semibold">Time Taken: {Math.floor(timeTaken / 60)}:{timeTaken % 60} minutes</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-3xl font-bold mb-6">Options Selected:</h2>
          {questions.map((question, index) => (
            <div key={index} className="bg-transparent p-6 rounded-lg shadow-md mb-6">
              <p className="text-xl font-semibold mb-4">Question {index + 1}: {question.question}</p>
              <p className="text-lg mb-2">Your Answer: {userAnswers[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;
