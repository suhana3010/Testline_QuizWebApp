import React from "react";

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold">Quiz Completed!</h2>
      <p className="mt-2">Your Score: {score} / {totalQuestions}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
