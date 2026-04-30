import { useState } from "react";
import { votingMethods } from "../data/electionData";

const miniQuiz = [
  { q: "Will you be in your home state on Election Day?", options: ["Yes", "No, I will be traveling", "Not sure yet"] },
  { q: "How important is avoiding long lines to you?", options: ["Very important", "Somewhat important", "Does not matter"] },
  { q: "Are you comfortable mailing documents?", options: ["Yes, no problem", "I would prefer not to", "I need assistance"] },
];

function recommend(a) {
  if (a[0] === 1) return "absentee";
  if (a[1] === 0 && a[0] === 0) return "early-voting";
  if (a[2] === 0) return "mail-in";
  return "in-person";
}

export default function VotingMethods() {
  const [expanded, setExpanded] = useState(null);
  const [quizStep, setQuizStep] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const answer = (idx) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (next.length === miniQuiz.length) { setResult(recommend(next)); setQuizStep(-1); }
    else setQuizStep((s) => s + 1);
  };
  const resetMiniQuiz = () => { setQuizStep(-1); setAnswers([]); setResult(null); };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Voting Methods Explained</h1>
      <p className="text-gray-500 mb-8">Understand your options and choose the method that works best for you.</p>

      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {votingMethods.map((m) => {
          const isOpen = expanded === m.id;
          return (
            <div key={m.id} className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${isOpen ? "border-civic-blue shadow-md" : "border-gray-100 hover:shadow-md"} ${result === m.id ? "ring-2 ring-civic-gold" : ""}`}>
              <button onClick={() => setExpanded(isOpen ? null : m.id)} className="w-full p-5 text-left" aria-expanded={isOpen}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{m.icon}</span>
                  <div><h3 className="font-semibold text-gray-900">{m.name}</h3><p className="text-xs text-gray-400 mt-0.5">{m.steps.length} steps</p></div>
                  <svg className={`ml-auto w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
                {result === m.id && <span className="mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-civic-gold/20 text-amber-800">Recommended for you</span>}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 animate-fade-in">
                  <h4 className="text-sm font-semibold text-civic-blue mb-2">Step-by-Step Guide</h4>
                  <ol className="space-y-2 mb-4">{m.steps.map((s, i) => (<li key={i} className="flex gap-2 text-sm text-gray-700"><span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-civic-blue text-xs font-bold shrink-0">{i + 1}</span>{s}</li>))}</ol>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-lg p-3"><p className="text-xs font-semibold text-green-800 mb-1">Pros</p><ul className="space-y-1">{m.pros.map((p, i) => <li key={i} className="text-xs text-green-700 flex gap-1"><span>&#10003;</span>{p}</li>)}</ul></div>
                    <div className="bg-red-50 rounded-lg p-3"><p className="text-xs font-semibold text-red-800 mb-1">Cons</p><ul className="space-y-1">{m.cons.map((c, i) => <li key={i} className="text-xs text-red-700 flex gap-1"><span>&#10007;</span>{c}</li>)}</ul></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto mb-12">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50"><th className="text-left p-4 font-semibold text-gray-700">Feature</th>{votingMethods.map((m) => <th key={m.id} className="p-4 font-semibold text-gray-700 text-center">{m.name.split(" ")[0]}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {[["Convenience","Medium","High","Very High","High"],["Accessibility","Medium","High","Very High","Very High"],["Speed","High","High","Medium","Low"],["Availability","Very High","Medium","High","Medium"]].map((row) => (
              <tr key={row[0]}><td className="p-4 font-medium text-gray-700">{row[0]}</td>{row.slice(1).map((v, j) => <td key={j} className="p-4 text-center text-xs">{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-br from-civic-blue to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Which method is right for me?</h2>
        <p className="text-blue-200 text-sm mb-5">Answer 3 quick questions to get a personalized recommendation.</p>
        {quizStep === -1 && !result && <button onClick={() => setQuizStep(0)} className="px-6 py-2.5 rounded-full bg-civic-gold text-gray-900 font-semibold hover:bg-civic-gold-light transition-colors">Start Quiz</button>}
        {quizStep >= 0 && (<div className="animate-fade-in"><p className="font-medium mb-3">{miniQuiz[quizStep].q}</p><div className="flex flex-col gap-2">{miniQuiz[quizStep].options.map((o, i) => <button key={i} onClick={() => answer(i)} className="text-left px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">{o}</button>)}</div></div>)}
        {result && (<div className="animate-fade-in"><p className="text-lg font-semibold mb-1">We recommend: {votingMethods.find((m) => m.id === result)?.name}</p><p className="text-blue-200 text-sm mb-4">Scroll up to see it highlighted with a gold border.</p><button onClick={resetMiniQuiz} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors">Retake Quiz</button></div>)}
      </div>
    </main>
  );
}
