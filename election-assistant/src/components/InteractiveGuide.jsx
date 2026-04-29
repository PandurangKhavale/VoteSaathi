import { useAppContext } from "../context/AppContext";

const situations = [
  { id: "first-time", label: "First-time Voter", icon: "\u{1F31F}", desc: "Voting for the first time in any election." },
  { id: "returning", label: "Returning Voter", icon: "\u{1F504}", desc: "I have voted before and want a refresher." },
  { id: "overseas", label: "Overseas Voter", icon: "\u{1F30D}", desc: "I am a U.S. citizen living or traveling abroad." },
  { id: "helping", label: "Helping Others", icon: "\u{1F91D}", desc: "I want to help someone else register or vote." },
];

const checklists = {
  "first-time": [
    { id: "ft-1", text: "Confirm you meet the eligibility requirements" },
    { id: "ft-2", text: "Gather required identification documents" },
    { id: "ft-3", text: "Register to vote at vote.gov or your state website" },
    { id: "ft-4", text: "Find your polling place or request a mail-in ballot" },
    { id: "ft-5", text: "Research candidates and ballot measures" },
    { id: "ft-6", text: "Review your sample ballot" },
    { id: "ft-7", text: "Make a plan for Election Day (time, transportation)" },
    { id: "ft-8", text: "Cast your vote and celebrate!" },
  ],
  returning: [
    { id: "rt-1", text: "Verify your voter registration is still active" },
    { id: "rt-2", text: "Update your address if you have moved" },
    { id: "rt-3", text: "Check if your polling place has changed" },
    { id: "rt-4", text: "Research new candidates and measures on the ballot" },
    { id: "rt-5", text: "Decide on your voting method (early, mail-in, or Election Day)" },
    { id: "rt-6", text: "Review identification requirements" },
    { id: "rt-7", text: "Cast your vote" },
  ],
  overseas: [
    { id: "os-1", text: "Register and request an absentee ballot at FVAP.gov" },
    { id: "os-2", text: "Submit Federal Post Card Application (FPCA)" },
    { id: "os-3", text: "Receive and review your absentee ballot" },
    { id: "os-4", text: "Complete your ballot following all instructions" },
    { id: "os-5", text: "Return your ballot before the deadline (mail, fax, or online)" },
    { id: "os-6", text: "Track your ballot to confirm receipt" },
  ],
  helping: [
    { id: "hp-1", text: "Learn your state voter registration rules" },
    { id: "hp-2", text: "Gather voter registration forms" },
    { id: "hp-3", text: "Help the person check their eligibility" },
    { id: "hp-4", text: "Assist with gathering required documents" },
    { id: "hp-5", text: "Help them submit their registration" },
    { id: "hp-6", text: "Share resources about candidates and ballot measures" },
    { id: "hp-7", text: "Help them create a voting day plan" },
    { id: "hp-8", text: "Offer to accompany them to the polls if needed" },
  ],
};

export default function InteractiveGuide() {
  const { guideState, selectSituation, toggleChecklistItem } = useAppContext();
  const { selectedSituation, checklist } = guideState;
  const items = selectedSituation ? checklists[selectedSituation] || [] : [];
  const done = items.filter((i) => checklist[i.id]).length;
  const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-slide-up">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Voting Guide</h1>
      <p className="text-gray-500 mb-8">Select your situation to receive a personalized action checklist.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {situations.map((s) => (
          <button key={s.id} onClick={() => selectSituation(s.id)} className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${selectedSituation === s.id ? "border-civic-blue bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"}`}>
            <span className="text-3xl block mb-2">{s.icon}</span>
            <h3 className="font-semibold text-gray-900">{s.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </button>
        ))}
      </div>

      {selectedSituation && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Action Plan</h2>
            <span className="text-sm font-bold text-civic-blue">{pct}% complete</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-civic-gold rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={item.id}>
                <label className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
                  <input type="checkbox" checked={!!checklist[item.id]} onChange={() => toggleChecklistItem(item.id)} className="mt-0.5 h-5 w-5 rounded border-gray-300 text-civic-blue focus:ring-civic-blue" />
                  <span className={`text-sm transition-colors ${checklist[item.id] ? "line-through text-gray-400" : "text-gray-700"}`}>
                    <span className="text-gray-400 mr-2">{i + 1}.</span>{item.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {pct === 100 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center text-green-800 font-medium animate-fade-in">
              You have completed all steps! You are ready to vote.
            </div>
          )}
        </div>
      )}

      {!selectedSituation && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-5xl mb-3">{"\u{1F446}"}</p>
          <p className="font-medium">Select your situation above to get started.</p>
        </div>
      )}
    </div>
  );
}
