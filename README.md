
# Brain Quest - Interactive Quiz Application

Brain Quest is a modern, interactive quiz application built with React that features gamification elements, smooth animations, and an engaging user interface. Test your knowledge while enjoying a visually appealing and responsive design.

![Brain Quest Screenshot](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)

## Features

- 🎮 Gamification elements (lives, streaks, points)
- ⏱️ Timed questions (30 seconds per question)
- 💫 Smooth animations using Framer Motion
- 🎉 Celebration effects on quiz completion
- 📱 Fully responsive design
- 🌙 Dark mode by default

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- React Confetti

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/brain-quest.git
   cd brain-quest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Game Rules

- Each question has a 30-second time limit
- Players start with 3 lives
- Correct answers award base points (100) plus streak bonus
- Incorrect answers or time-outs cost one life
- Game ends when all lives are lost or all questions are answered
- Streak multiplier increases points for consecutive correct answers

## Project Structure

```
src/
├── components/         # React components
│   ├── LoadingSpinner.jsx
│   ├── Question.jsx
│   ├── QuizStart.jsx
│   └── Results.jsx
├── App.jsx            # Main application component
├── index.css          # Global styles
├── main.jsx          # Application entry point
└── mockData.js       # Mock quiz data
```

## API Integration

The application attempts to fetch quiz data from an external API endpoint. If the API is unavailable, it falls back to local mock data for demonstration purposes.

To use your own API, modify the `fetchQuizData` function in `App.jsx`:

```javascript
const fetchQuizData = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT');
    if (!response.ok) throw new Error('Failed to fetch quiz data');
    const data = await response.json();
    setQuizData(data);
  } catch (err) {
    console.log('Using mock data due to API failure');
    setQuizData(mockQuizData);
  } finally {
    setLoading(false);
  }
};
```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
