import { useState, useCallback, useEffect } from 'react';
import { questions } from '../data/quizQuestions';
import { useAppContext } from '../context/AppContext';
import { trackQuizCompletion, trackEngagement, trackFeatureUsage } from '../utils/analyticsService';

function getBadge(score, total) {
  const pct = score / total;
  if (pct >= 0.8) return { label: 'Democracy Champion', emoji: '🏆', color: 'text-civic-gold' };
  if (pct >= 0.5) return { label: 'Informed Voter', emoji: '🎖️', color: 'text-civic-blue' };
  return { label: 'Novice', emoji: '📘', color: 'text-gray-500' };
}

export default function Quiz() {
  const { quizState, completeQuiz, resetQuiz } = useAppContext();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(quizState.completed);
  const [score, setScore] = useState(quizState.score);

  // Track quiz start
  useEffect(() => {
    trackFeatureUsage('QuizStarted');
    trackEngagement('QuizActivity', 'Started');
  }, []);

  const q = questions[idx];
  const total = questions.length;
  const progressPct = ((idx + (showFeedback ? 1 : 0)) / total) * 100;

  const handleSelect = useCallback(
    (optIdx) => {
      if (showFeedback) return;
      setSelected(optIdx);
      setShowFeedback(true);
      const correct = optIdx === q.correctIndex;
      const newAnswers = [...answers, { questionId: q.id, selected: optIdx, correct }];
      setAnswers(newAnswers);
      if (correct) setScore((s) => s + 1);

      // Track question answer
      trackEngagement('QuizAnswer', correct ? 'Correct' : 'Incorrect');
    },
    [showFeedback, q, answers],
  );

  const handleNext = () => {
    if (idx + 1 >= total) {
      const finalScore = answers.filter((a) => a.correct).length;
      completeQuiz(finalScore, answers);
      setScore(finalScore);
      setFinished(true);

      // Track quiz completion
      trackQuizCompletion(finalScore, total);
      trackEngagement('QuizCompleted', `${finalScore}/${total}`);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    }
  };

  const handleRetake = () => {
    resetQuiz();
    setIdx(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    setFinished(false);
    setScore(0);

    // Track quiz restart
    trackEngagement('QuizRestarted', 'UserInitiated');
    trackFeatureUsage('QuizStarted');
  };

  const handleShare = () => {
    const badge = getBadge(score, total);
    const text = `I scored ${score}/${total} on the Election Knowledge Quiz and earned the "${badge.label}" badge! 🗳️`;
    navigator.clipboard.writeText(text);

    // Track score sharing
    trackEngagement('QuizScoreShared', `${score}/${total}`);
  };

  if (finished) {
    const badge = getBadge(score, total);
    return (
      <section className="max-w-2xl mx-auto px-4 py-16 text-center animate-slide-up">
        <span className="text-7xl block mb-4">{badge.emoji}</span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-5xl font-extrabold text-civic-blue my-4">
          {score}<span className="text-2xl text-gray-400">/{total}</span>
        </p>
        <p className={`text-xl font-semibold ${badge.color} mb-8`}>{badge.label}</p>
        <div className="flex justify-center gap-3">
          <button onClick={handleRetake} className="px-6 py-2.5 rounded-full bg-civic-blue text-white font-semibold hover:bg-blue-700 transition-colors">
            Retake Quiz
          </button>
          <button onClick={handleShare} className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
            📋 Share Score
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-10 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Election Knowledge Quiz</h1>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Question {idx + 1} of {total}</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-civic-blue rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in" key={idx}>
        <h2 className="text-lg font-semibold text-gray-900 mb-5">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = 'border-gray-200 hover:border-civic-blue hover:bg-blue-50';
            if (showFeedback) {
              if (i === q.correctIndex) style = 'border-green-500 bg-green-50';
              else if (i === selected && i !== q.correctIndex) style = 'border-red-400 bg-red-50';
              else style = 'border-gray-100 opacity-60';
            } else if (selected === i) {
              style = 'border-civic-blue bg-blue-50';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${style} disabled:cursor-default`}
              >
                <span className="mr-2 text-gray-400">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`mt-5 p-4 rounded-lg text-sm animate-fade-in ${selected === q.correctIndex ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-semibold mb-1">{selected === q.correctIndex ? '✅ Correct!' : '❌ Incorrect'}</p>
            <p>{q.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <button onClick={handleNext} className="mt-5 px-6 py-2.5 rounded-lg bg-civic-blue text-white font-semibold hover:bg-blue-700 transition-colors">
            {idx + 1 >= total ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </section>
  );
}
