

import React, { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const App = () => {
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.allorigins.win/get?url=" +
        encodeURIComponent("https://api.jsonserve.com/Uw5CrX")
    )
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.contents);
        setQuizData(parsedData);

        const formattedQuestions = parsedData.questions.map((q) => ({
          question: q.description,
          options: q.options.map((opt) => opt.description),
          correctAnswer:
            q.options.find((opt) => opt.is_correct)?.description || "",
          detailed_solution: q.detailed_solution || "No solution provided",
        }));

        setQuestions(formattedQuestions);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setQuizCompleted(true);
    }
  }, [quizStarted, quizCompleted, timeLeft]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 4);
    } else {
      setScore(score - 1);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-teal-500 to-purple-600 flex flex-col items-center text-white text-center p-6 overflow-y-auto">
      {quizCompleted && score === 40 && <Confetti />}
      {/* Navbar */}
      <nav className="w-full bg-purple-800 py-4 shadow-md fixed top-0 left-0 z-50 text-lg font-semibold">
        <ul className="flex justify-around">
          <li className="cursor-pointer hover:text-yellow-300">🏠 Home</li>
          <li className="cursor-pointer hover:text-yellow-300">📚 About</li>
          <li className="cursor-pointer hover:text-yellow-300">
            🎯 Leaderboard
          </li>
        </ul>
      </nav>
      <div
        className="absolute bottom-1 left-1 w-29 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/dna-6293614.png"
          alt="DNA Icon"
          className="w-29 left-1 animate-float"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        {showTooltip && (
          <motion.div
            className="absolute -top-1 left-0.5 bg-white text-black p-2 rounded-lg shadow-lg text-sm w-48"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 5, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            🧬 Did you know? If uncoiled, the DNA in all your cells would
            stretch to the Sun and back over 600 times!
          </motion.div>
        )}
      </div>

      <div className="mt-20">
        {!quizStarted ? (
          <div className="max-w-lg text-center">
            <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
              🚀 Welcome to the Ultimate Quiz Challenge!
            </h1>
            <p className="text-lg mb-6">
              Test your knowledge and climb the leaderboard. Are you ready?
            </p>
            <button
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg text-lg shadow-md transition duration-300 ease-in-out"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </div>
        ) : !quizCompleted ? (
          questions.length > 0 ? (
            <div className="w-full max-w-xl bg-white text-black p-6 rounded-xl shadow-lg">
              <div className="text-lg font-semibold text-red-500 mb-3 animate-pulse">
                ⏳ Time Left: {formatTime(timeLeft)}
              </div>
              <QuestionCard
                question={questions[currentQuestionIndex]?.question}
                options={questions[currentQuestionIndex]?.options || []}
                detailedSolution={
                  questions[currentQuestionIndex]?.detailed_solution
                }
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                metadata={quizData}
              />
              <button
                className={`mt-4 px-4 py-2 rounded text-white ${
                  selectedAnswer
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                Next
              </button>
            </div>
          ) : (
            <p>Loading questions...</p>
          )
        ) : (
          <motion.div
            className="text-center bg-white text-black p-6 rounded-xl shadow-lg w-80 mt-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-purple-800">
              🎉 Quiz Completed!
            </h2>
            <p className="text-xl font-semibold">Your Score: {score}/40</p>
            <motion.button
              className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition transform hover:scale-105"
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.1 }}
            >
              🔄 Retake Quiz
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;
