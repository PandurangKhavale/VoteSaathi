import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAIResponse, getStoredApiKey, storeApiKey } from '../utils/aiService';

describe('AI Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should return null if no API key is provided', async () => {
    const response = await getAIResponse('hello', null);
    expect(response).toBeNull();
  });

  it('should store and retrieve API key', () => {
    storeApiKey('test-key');
    expect(getStoredApiKey()).toBe('test-key');
  });

  it('should handle API errors gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Failed' })
    });

    const response = await getAIResponse('hello', 'key');
    expect(response).toBeNull();
  });

  it('should return text on successful API call', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        candidates: [{ content: { parts: [{ text: 'AI response' }] } }]
      })
    });

    const response = await getAIResponse('hello', 'key');
    expect(response).toBe('AI response');
  });
});
