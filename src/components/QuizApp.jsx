import React from "react";

const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-96">
      <h2 className="text-lg font-semibold">{question}</h2>
      <div className="mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`block w-full p-2 mb-2 rounded border ${
              selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => onAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
