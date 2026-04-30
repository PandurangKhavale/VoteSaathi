import { useState, useMemo } from 'react';
import { registrationSteps } from '../data/electionData';

const eligibilityItems = [
  { id: 'citizen', label: 'I am a U.S. citizen' },
  { id: 'age', label: 'I am or will be 18 by Election Day' },
  { id: 'resident', label: 'I am a resident of the state where I plan to vote' },
  { id: 'not-disqualified', label: 'I am not currently serving a disqualifying felony sentence' },
];

const faqs = [
  { q: 'Can I register to vote online?', a: 'Yes — most states offer online voter registration through their Secretary of State website. Visit vote.gov for direct links to your state.' },
  { q: 'What if I moved to a new state?', a: 'You must register in your new state of residence. Update your registration as soon as possible, and check your new state\'s deadline.' },
  { q: 'Can I register on Election Day?', a: 'Some states allow same-day registration. Check your state\'s rules, as you may still need identification and proof of residency.' },
  { q: 'How do I check if I\'m already registered?', a: 'Visit vote.org/am-i-registered or your state\'s voter lookup tool to verify your registration status.' },
];

/* Days until a fixed registration deadline */
function daysUntilDeadline() {
  const deadline = new Date();
  deadline.setMonth(deadline.getMonth() + 4);
  deadline.setDate(1);
  const diff = deadline - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function VoterRegistration() {
  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const days = useMemo(daysUntilDeadline, []);

  const toggleCheck = (id) => setChecks((p) => ({ ...p, [id]: !p[id] }));

  const allEligible = eligibilityItems.every((i) => checks[i.id]);
  const current = registrationSteps[step];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Get registered in three steps</h1>
      <p className="text-gray-500 mb-8">Everything you need, from eligibility to submission, in one place.</p>

      {/* Deadline countdown */}
      <div className="bg-gradient-to-r from-civic-blue to-blue-600 text-white rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="text-5xl font-extrabold">{days}</div>
        <div>
          <p className="font-semibold text-lg">days until the deadline closes</p>
          <p className="text-blue-200 text-sm">The sooner you register, the less you have to worry about later.</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8" aria-label="Registration steps">
        {registrationSteps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => setStep(i)}
              aria-current={i === step ? 'step' : undefined}
              className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all duration-200 ${
                i === step
                  ? 'bg-civic-blue text-white shadow-md scale-110'
                  : i < step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </button>
            {i < registrationSteps.length - 1 && (
              <div className={`h-0.5 w-8 sm:w-14 rounded ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 animate-fade-in" key={step}>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{current.title}</h2>
        <p className="text-gray-600 mb-4">{current.description}</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Required Documents</h3>
            <ul className="space-y-2">
              {current.documents.map((d, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-civic-blue mt-2 shrink-0" />{d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Helpful Tips</h3>
            <ul className="space-y-2">
              {current.tips.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-civic-gold mt-2 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            disabled={step === registrationSteps.length - 1}
            onClick={() => setStep((s) => s + 1)}
            className="px-5 py-2 rounded-lg bg-civic-blue text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>

      {/* Eligibility checklist */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Check My Eligibility</h2>
        <ul className="space-y-3">
          {eligibilityItems.map((item) => (
            <li key={item.id}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={!!checks[item.id]}
                  onChange={() => toggleCheck(item.id)}
                  className="h-5 w-5 rounded border-gray-300 text-civic-blue focus:ring-civic-blue"
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
        {allEligible && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium animate-fade-in">
            ✅ Great news — you meet all eligibility requirements! Proceed with your registration.
          </div>
        )}
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left text-gray-800 font-medium hover:text-civic-blue transition-colors"
                aria-expanded={openFaq === i}
              >
                {f.q}
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <p className="pb-4 text-sm text-gray-600 animate-fade-in">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
