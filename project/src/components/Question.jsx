import { motion } from 'framer-motion';
import { useState } from 'react';

const Question = ({ question, onAnswer, timeLeft, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    setTimeout(() => {
      onAnswer(answer === question.correctAnswer);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  const getAnswerClassName = (answer) => {
    if (!isAnswered || selectedAnswer !== answer) {
      return "bg-white/10 hover:bg-white/20";
    }
    return answer === question.correctAnswer ? "bg-green-500" : "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
    >
      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/20 rounded-full mb-6">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 30) * 100}%` }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Question Counter */}
      <div className="text-sm text-purple-200 mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

      {/* Answers */}
      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswerClick(answer)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg text-left transition-colors ${getAnswerClassName(answer)}`}
          >
            {answer}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;