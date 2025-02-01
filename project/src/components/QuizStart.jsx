import { motion } from 'framer-motion';
import { Brain, Timer, Heart, Trophy } from 'lucide-react';

const QuizStart = ({ onStart, totalQuestions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
    >
      <Brain className="w-16 h-16 mx-auto mb-6 text-purple-400" />
      <h2 className="text-2xl font-bold mb-4">Ready to Challenge Your Mind?</h2>
      <p className="mb-6 text-purple-200">Test your knowledge with our interactive quiz!</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 p-4 rounded-lg">
          <Timer className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <p className="text-sm">30 seconds per question</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <Heart className="w-8 h-8 mx-auto mb-2 text-red-400" />
          <p className="text-sm">3 lives</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <p className="text-sm">Earn bonus points</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <p className="text-sm">{totalQuestions} questions</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
      >
        Start Quiz
      </button>
    </motion.div>
  );
};

export default QuizStart;