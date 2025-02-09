// // // import React from "react";

// // // const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect }) => {
// // //   return (
// // //     <div>
// // //       <h2>{question}</h2>
// // //       <ul>
// // //         {options.map((option, index) => (
// // //           <li key={index}>
// // //             <button onClick={() => onAnswerSelect(option)}>
// // //               {option.description} {/* 👈 Ensure we're rendering text, not an object */}
// // //             </button>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
  
// // // };

// // // export default QuestionCard;
// // import React from "react";

// // const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect }) => {
// //   return (
// //     <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
// //       {/* Display Question */}
// //       <h2 className="text-xl font-semibold mb-4">{question || "No Question Available"}</h2>

// //       {/* Display Options */}
// //       <ul className="space-y-2">
// //         {options && options.length > 0 ? (
// //           options.map((option, index) => (
// //             <li key={index}>
// //               <button
// //                 className={`w-full px-4 py-2 rounded-lg border 
// //                 ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`}
// //                 onClick={() => onAnswerSelect(option)}
// //               >
// //                 {option.description || option} {/* Handle both object and string formats */}
// //               </button>
// //             </li>
// //           ))
// //         ) : (
// //           <p className="text-gray-500">No options available</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default QuestionCard;
// import React, { useState } from "react";

// const QuestionCard = ({ question, options, detailedSolution, selectedAnswer, onAnswerSelect }) => {
//   const [showAnswer, setShowAnswer] = useState(false);

//   return (
//     <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
//       {/* Display Question */}
//       <h2 className="text-xl font-semibold mb-4">{question || "No Question Available"}</h2>

//       {/* Display Options */}
//       <ul className="space-y-2">
//         {options && options.length > 0 ? (
//           options.map((option, index) => (
//             <li key={index}>
//               <button
//                 className={`w-full px-4 py-2 rounded-lg border 
//                 ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`}
//                 onClick={() => onAnswerSelect(option)}
//               >
//                 {option.description || option} {/* Handle both object and string formats */}
//               </button>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500">No options available</p>
//         )}
//       </ul>

//       {/* Show Answer Button */}
//       <button
//         onClick={() => setShowAnswer(!showAnswer)}
//         className="mt-4 text-blue-600 underline"
//       >
//         {showAnswer ? "Hide Answer" : "Show Answer"}
//       </button>

//       {/* Display Detailed Solution when toggled */}
//       {showAnswer && (
//         <div className="mt-3 p-3 bg-gray-100 rounded whitespace-pre-line">
//           <strong>Explanation:</strong> {detailedSolution || "No detailed solution available"}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionCard;
import React, { useState } from "react";

const QuestionCard = ({
  question,
  options,
  detailedSolution,
  selectedAnswer,
  onAnswerSelect,
  metadata, // Additional quiz metadata
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
      {/* Display Quiz Metadata */}
      <div className="mb-2 text-gray-600 text-sm">
        <p><strong>Topic:</strong> {metadata.topic || "Unknown"}</p>
        <p><strong>Difficulty:</strong> {metadata.difficulty_level || "N/A"}</p>
        <p><strong>Marks:</strong> {metadata.correct_answer_marks || "N/A"} | <strong>Negative:</strong> {metadata.negative_marks || "N/A"}</p>
        <p><strong>Time Limit:</strong> {metadata.duration ? `${metadata.duration} min` : "N/A"}</p>
        <p><strong>Questions:</strong> {metadata.questions_count || "N/A"}</p>
      </div>

      {/* Display Question */}
      <h2 className="text-xl font-semibold mb-4">{question || "No Question Available"}</h2>

      {/* Display Options */}
      <ul className="space-y-2">
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <li key={index}>
              <button
                className={`w-full px-4 py-2 rounded-lg border 
                ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`}
                onClick={() => onAnswerSelect(option)}
              >
                {option.description || option} {/* Handle both object and string formats */}
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No options available</p>
        )}
      </ul>

      {/* Show Answer Button */}
      {metadata.show_answers && (
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-4 text-blue-600 underline"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      )}

      {/* Display Detailed Solution when toggled */}
      {showAnswer && (
        <div className="mt-3 p-3 bg-gray-100 rounded whitespace-pre-line">
          <strong>Explanation:</strong> {detailedSolution || "No detailed solution available"}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
