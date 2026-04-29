import { useState, useMemo } from 'react';
import { electionMilestones } from '../data/timelines';

const categoryIcons = {
  Registration: '📝',
  Campaign: '📢',
  Election: '🗳️',
  Voting: '✉️',
  'Post-Election': '📊',
};

function getStatus(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + 'T00:00:00');
  if (d.getTime() === today.getTime()) return 'Today';
  return d < today ? 'Completed' : 'Upcoming';
}

const statusStyles = {
  Completed: 'bg-green-100 text-green-800',
  Today: 'bg-civic-gold/20 text-amber-800',
  Upcoming: 'bg-blue-100 text-civic-blue',
};

const dotStyles = {
  Completed: 'bg-green-500',
  Today: 'bg-civic-gold ring-4 ring-amber-200',
  Upcoming: 'bg-blue-300',
};

export default function ElectionTimeline() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const milestones = useMemo(
    () =>
      electionMilestones
        .map((m) => ({ ...m, status: getStatus(m.date) }))
        .filter((m) => filter === 'All' || m.status === filter),
    [filter],
  );

  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Election Timeline</h1>
          <p className="text-gray-500 mt-1">Key dates and milestones for the 2026 election cycle.</p>
        </div>
        <button
          onClick={handlePrint}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors print:hidden"
          aria-label="Print timeline"
        >
          🖨️ Print
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 print:hidden">
        {['All', 'Upcoming', 'Completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === f
                ? 'bg-civic-blue text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-civic-blue hover:text-civic-blue'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {milestones.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-3">📭</p>
          <p className="font-medium">No milestones match this filter.</p>
        </div>
      )}

      {/* Vertical timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 print:bg-gray-300" />
        <ul className="space-y-6">
          {milestones.map((m) => (
            <li key={m.id} className="relative pl-14">
              {/* Dot */}
              <span
                className={`absolute left-3.5 top-5 w-4 h-4 rounded-full border-2 border-white ${dotStyles[m.status]}`}
              />
              {/* Card */}
              <button
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                aria-expanded={expanded === m.id}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                  <span className="text-2xl">{categoryIcons[m.category] || '📌'}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{m.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(m.date + 'T00:00:00').toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[m.status]}`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{m.description}</p>
              </button>

              {/* Expanded detail */}
              {expanded === m.id && (
                <div className="mt-2 bg-blue-50/50 border border-blue-100 rounded-xl p-5 animate-fade-in">
                  <h4 className="text-sm font-semibold text-civic-blue mb-3">Action Steps</h4>
                  <ol className="space-y-2">
                    {m.actionSteps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-700">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-civic-blue text-white text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
