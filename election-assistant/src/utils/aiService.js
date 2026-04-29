const SYSTEM_PROMPT = `You are VoteSaathi Assistant, a friendly and knowledgeable election education chatbot.
Your role is to help users understand the election process, voter registration, voting methods, candidate research, and civic participation.

Guidelines:
- Provide accurate, non-partisan information about elections and voting.
- Keep responses concise (under 200 words) and easy to understand.
- Use bullet points and bold text (**like this**) for key information.
- If asked about specific candidates or parties, remain neutral and direct users to non-partisan resources.
- If a question is outside the scope of elections/voting, politely redirect to election topics.
- Be encouraging about civic participation.
- You can discuss elections globally but focus primarily on democratic election processes.

Key resources to recommend:
- vote.gov (US voter registration)
- Ballotpedia (candidate research)
- FactCheck.org (fact-checking)
- OpenSecrets.org (campaign finance)
- VOTE411.org (personalized voting info)`;

export async function getAIResponse(userMessage, apiKey, conversationHistory = []) {
  if (!apiKey) return null;

  const historyContents = conversationHistory.slice(-6).map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...historyContents,
            { role: "user", parts: [{ text: userMessage }] },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", errData);
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || null;
  } catch (err) {
    console.error("AI request failed:", err);
    return null;
  }
}

export function getStoredApiKey() {
  try {
    return localStorage.getItem("ea_gemini_key") || "";
  } catch {
    return "";
  }
}

export function storeApiKey(key) {
  try {
    localStorage.setItem("ea_gemini_key", key);
  } catch {
    /* noop */
  }
}
