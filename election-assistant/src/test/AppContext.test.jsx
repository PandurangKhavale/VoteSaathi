import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../context/AppContext';

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should throw error if used outside provider', () => {
    // Suppress console.error for this expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAppContext())).toThrow('useAppContext must be used inside <AppProvider>');
    spy.mockRestore();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });
    expect(result.current.quizState.completed).toBe(false);
    expect(result.current.quizState.score).toBe(0);
  });

  it('should complete quiz', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });
    act(() => {
      result.current.completeQuiz(8, [{ q: 1, correct: true }]);
    });
    expect(result.current.quizState.completed).toBe(true);
    expect(result.current.quizState.score).toBe(8);
  });

  it('should reset quiz', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });
    act(() => {
      result.current.completeQuiz(8, []);
      result.current.resetQuiz();
    });
    expect(result.current.quizState.completed).toBe(false);
  });

  it('should select situation and toggle items', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });
    act(() => {
      result.current.selectSituation('US');
      result.current.toggleChecklistItem('item1');
    });
    expect(result.current.guideState.selectedSituation).toBe('US');
    expect(result.current.guideState.checklist['item1']).toBe(true);
  });
});
