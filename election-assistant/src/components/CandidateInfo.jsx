import { useState } from 'react';
import { candidateCriteria, resources } from '../data/electionData';

const tabs = ['How to Research', 'Red Flags', 'Ballot Measures', 'Resources'];

const redFlags = [
  { icon: '🚩', text: 'Refuses to release tax returns or financial disclosures' },
  { icon: '🚩', text: 'Makes promises with no clear plan to fund or implement them' },
  { icon: '🚩', text: 'Attacks opponents personally rather than debating policy' },
  { icon: '🚩', text: 'Receives disproportionate funding from a single industry' },
  { icon: '🚩', text: 'Has a history of flip-flopping on key issues without explanation' },
  { icon: '🚩', text: 'Avoids public debates or press conferences' },
];

const ballotTips = [
  { title: 'Read the Full Text', desc: 'Ballot measure summaries can be misleading. Always read the full text and any impartial analysis.' },
  { title: 'Check Who Supports It', desc: 'Look at the organizations funding support and opposition campaigns.' },
  { title: 'Understand the Fiscal Impact', desc: 'Review the fiscal impact statement to see how the measure affects budgets and taxes.' },
  { title: 'Look for Non-Partisan Analysis', desc: 'Organizations like Ballotpedia provide neutral breakdowns of ballot measures.' },
];

export default function CandidateInfo() {
  const [tab, setTab] = useState(0);
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const total = candidateCriteria.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Information Guide</h1>
      <p className="text-gray-500 mb-8">Evaluate candidates objectively using these research tools and checklists.</p>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 border-b border-gray-200 mb-8" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              tab === i
                ? 'border-civic-blue text-civic-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={tab}>
        {tab === 0 && (
          <div>
            {/* Completion bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-900">Candidate Comparison Checklist</h2>
                <span className="text-sm font-bold text-civic-blue">{pct}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-civic-blue rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <div className="space-y-3">
              {candidateCriteria.map((c) => (
                <label
                  key={c.id}
                  className="flex gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow group"
                >
                  <input
                    type="checkbox"
                    checked={!!checked[c.id]}
                    onChange={() => toggle(c.id)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-civic-blue focus:ring-civic-blue shrink-0"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{c.category}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{c.criteria}</p>
                    <p className="text-xs text-gray-400 mt-1 italic">{c.why}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {redFlags.map((f, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                <span className="text-xl">{f.icon}</span>
                <p className="text-sm text-red-800">{f.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {ballotTips.map((b, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {resources.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-civic-blue transition-colors">{r.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{r.type}</span>
                </div>
                <p className="text-sm text-gray-600">{r.description}</p>
                <span className="mt-2 inline-flex items-center text-xs text-civic-blue font-medium">
                  Visit site ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
