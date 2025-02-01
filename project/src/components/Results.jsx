import { motion } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';

const Results = ({ score, totalQuestions, onRestart }) => {
  const percentage = (score / (totalQuestions * 100)) * 100;
  
  let message;
  if (percentage >= 90) message = "Outstanding! You're a quiz master! 🏆";
  else if (percentage >= 70) message = "Great job! Keep it up! 🌟";
  else if (percentage >= 50) message = "Good effort! Room for improvement! 💪";
  else message = "Keep practicing! You'll get better! 📚";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
    >
      <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
      <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
      <p className="text-purple-200 mb-6">{message}</p>

      <div className="bg-white/5 rounded-lg p-6 mb-8">
        <div className="text-4xl font-bold mb-2">{score}</div>
        <div className="text-sm text-purple-200">Total Score</div>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
      >
        <RotateCcw className="w-5 h-5" />
        Play Again
      </button>
    </motion.div>
  );
};

export default Results;