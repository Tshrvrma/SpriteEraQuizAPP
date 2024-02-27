import React from "react";
import { useNavigate } from 'react-router-dom';

function Page1() {
  const navigate = useNavigate();

  // Function to navigate to Page2
  function revertToPage2() {
    navigate('/Page2');
  }

  return (
    <div className="min-h-screen flex flex-col justify-center  bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 mx-auto">Welcome to the React Quiz!</h1>
      <p className="mb-6 mx-auto">This quiz will test your knowledge of React. Are you ready?</p>
      
      <div className="mb-8 mx-auto">
        <button
          className="bg-green-500 hover:bg-green-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded"
          onClick={revertToPage2}
        >
          Start Quiz
        </button>
      </div>

      <div className="mx-auto ">
        <p className="mb-2  text-3xl">Instructions:</p>
      <ol className="list-decimal pl-6 mb-4">
        <li>Do not use external resources or search engines during the quiz.</li>
        <li>Answer each question based on your knowledge without assistance.</li>
        <li>Do not collaborate or discuss questions with others while taking the quiz.</li>
        <li>Complete the quiz within 5 minutes to ensure fairness (quiz will auto-submit after 5 minutes).</li>
        <li>Any attempt to cheat may result in invalidation of your quiz submission.</li>
      </ol></div>

      <p className="mb-4 text-red-400 mx-auto text-xl text-wrap">Note: The quiz will automatically submit if you change tabs during the quiz.</p>
    </div>
  );
}

export default Page1;
