import { describe, it, expect } from 'vitest';
import { processMessage } from '../utils/chatEngine';

describe('Chat Engine', () => {
  it('identifies greetings correctly', () => {
    const result = processMessage('hello', null);
    expect(result.text).toContain('VoteSaathi');
  });

  it('provides registration information', () => {
    const result = processMessage('how do i register', null);
    expect(result.text).toContain('Voter Registration Guide');
  });

  it('calculates registration deadline correctly', () => {
    const result = processMessage('deadline', null);
    expect(result.text).toMatch(/days.*away/i);
  });

  it('explains eligibility requirements', () => {
    const result = processMessage('am i eligible to vote', null);
    expect(result.text).toContain('U.S. citizen');
  });

  it('handles unknown messages by returning null (for AI fallback)', () => {
    const result = processMessage('xyzpdq-unknown-string', null);
    expect(result).toBeNull();
  });

  describe('Quiz Flow', () => {
    it('starts a quiz when requested', () => {
      const result = processMessage('take a quiz', null);
      expect(result.quiz).toBeDefined();
      expect(result.quiz.active).toBe(true);
    });

    it('processes quiz answers correctly', () => {
      const start = processMessage('quiz', null);
      const result = processMessage('1', start.quiz); 
      expect(result.quiz).toBeDefined();
      expect(result.quiz.index).toBe(1);
    });

    it('completes the quiz and gives a badge', () => {
      const quizState = { active: true, index: 9, score: 8 };
      const result = processMessage('1', quizState);
      expect(result.quiz).toBeNull();
      expect(result.text).toContain('Quiz complete');
    });
  });
});
