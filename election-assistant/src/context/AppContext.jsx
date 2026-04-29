import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [quizState, setQuizState] = useState({
    completed: false,
    score: 0,
    totalQuestions: 10,
    answers: [],
  });

  const [guideState, setGuideState] = useState(() => {
    try {
      const saved = localStorage.getItem('ea_guideState');
      return saved
        ? JSON.parse(saved)
        : { selectedSituation: null, checklist: {} };
    } catch {
      return { selectedSituation: null, checklist: {} };
    }
  });

  useEffect(() => {
    localStorage.setItem('ea_guideState', JSON.stringify(guideState));
  }, [guideState]);

  const completeQuiz = useCallback((score, answers) => {
    setQuizState({ completed: true, score, totalQuestions: 10, answers });
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizState({ completed: false, score: 0, totalQuestions: 10, answers: [] });
  }, []);

  const selectSituation = useCallback((situation) => {
    setGuideState((prev) => ({ ...prev, selectedSituation: situation, checklist: {} }));
  }, []);

  const toggleChecklistItem = useCallback((itemId) => {
    setGuideState((prev) => ({
      ...prev,
      checklist: { ...prev.checklist, [itemId]: !prev.checklist[itemId] },
    }));
  }, []);

  const value = {
    quizState,
    completeQuiz,
    resetQuiz,
    guideState,
    selectSituation,
    toggleChecklistItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
