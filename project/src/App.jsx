import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Award, Heart } from 'lucide-react';
import Confetti from 'react-confetti';
import QuizStart from './components/QuizStart';
import Question from './components/Question';
import Results from './components/Results';
import LoadingSpinner from './components/LoadingSpinner';
import { mockQuizData } from './mockData';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('start'); // start, playing, results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      // First try to fetch from the API
      const response = await fetch('https://api.jsonserve.com/Uw5CrX');
      if (!response.ok) throw new Error('Failed to fetch quiz data');
      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      // If API fails, use mock data
      console.log('Using mock data due to API failure');
      setQuizData(mockQuizData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleAnswer(null);
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startQuiz = () => {
    setGameState('playing');
    setTimeLeft(30);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + (100 + streak * 50));
      setStreak(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      if (lives === 1) {
        endQuiz();
        return;
      }
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setGameState('results');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setGameState('start');
    setTimeLeft(30);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
      {gameState === 'results' && <Confetti />}
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Brain Quest</h1>
          <p className="text-lg text-purple-200">Test your knowledge!</p>
        </motion.div>

        {/* Game Stats */}
        {gameState === 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mb-6 bg-white/10 p-4 rounded-lg backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="text-blue-400" />
              <span>{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-green-400" />
              <span>x{streak}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(lives)].map((_, i) => (
                <Heart key={i} className="text-red-400 w-5 h-5" fill="currentColor" />
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <QuizStart 
              key="start"
              onStart={startQuiz} 
              totalQuestions={quizData.questions.length}
            />
          )}

          {gameState === 'playing' && (
            <Question
              key="question"
              question={quizData.questions[currentQuestion]}
              onAnswer={handleAnswer}
              timeLeft={timeLeft}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizData.questions.length}
            />
          )}

          {gameState === 'results' && (
            <Results
              key="results"
              score={score}
              totalQuestions={quizData.questions.length}
              onRestart={resetQuiz}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;