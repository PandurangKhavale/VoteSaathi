import { registrationSteps, votingMethods, candidateCriteria, resources } from "../data/electionData";
import { electionMilestones } from "../data/timelines";
import { questions } from "../data/quizQuestions";

function daysUntilDeadline() {
  const d = new Date();
  d.setMonth(d.getMonth() + 4);
  d.setDate(1);
  return Math.max(0, Math.ceil((d - new Date()) / 86400000));
}

function getUpcoming() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return electionMilestones.filter((m) => new Date(m.date + "T00:00:00") >= today).slice(0, 3);
}

function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const TOPICS = ["Voter Registration", "Voting Methods", "Election Timeline", "Candidate Research", "Take a Quiz", "Find Resources"];

function methodInfo(id) {
  const m = votingMethods.find((v) => v.id === id);
  if (!m) return null;
  return {
    text: `**${m.name}** ${m.icon}\n\n**Steps:**\n${m.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n**Pros:** ${m.pros.join(", ")}\n\n**Cons:** ${m.cons.join(", ")}`,
    suggestions: ["Other voting methods", "Voter Registration", "Election Timeline"],
  };
}

// ── Pattern bank ──
const patterns = [
  // Greetings & Small Talk
  { keys: ["hello", "hi", "hey", "namaste", "good morning", "good evening", "greetings"], topic: "greeting" },
  { keys: ["how are you", "how are things", "how do you do", "what's up", "whats up"], topic: "how_are_you" },
  { keys: ["who are you", "what are you", "are you a bot", "who made you", "creator", "are you human"], topic: "who_are_you" },
  { keys: ["what can you do", "help me", "what do you know", "capabilities", "features", "how does this work", "how it works"], topic: "capabilities" },
  { keys: ["bye", "goodbye", "see you", "later", "cya", "quit", "exit"], topic: "bye" },

  // Registration
  { keys: ["register", "registration", "sign up", "signup", "how do i register"], topic: "registration" },
  { keys: ["eligible", "eligibility", "can i vote", "am i eligible", "requirements to vote", "qualify"], topic: "eligibility" },
  { keys: ["deadline", "last day to register", "how many days", "registration deadline"], topic: "deadline" },
  { keys: ["document", "what id", "identification", "what do i need", "what to bring", "bring to poll"], topic: "documents" },
  { keys: ["same day registration", "same-day registration", "register on election day"], topic: "sameday" },
  { keys: ["update registration", "change address", "moved", "new address", "change my registration"], topic: "update_reg" },
  { keys: ["check registration", "am i registered", "registration status", "verify registration"], topic: "check_reg" },

  // Voting methods
  { keys: ["in-person", "in person", "polling place", "poll ", "at the polls"], topic: "in-person" },
  { keys: ["early voting", "early vote", "vote early"], topic: "early-voting" },
  { keys: ["mail-in", "mail in", "mail ballot", "vote by mail"], topic: "mail-in" },
  { keys: ["absentee", "overseas", "abroad", "military vote", "fvap"], topic: "absentee" },
  { keys: ["voting method", "how to vote", "ways to vote", "vote options", "how can i vote"], topic: "methods" },
  { keys: ["provisional ballot", "provisional"], topic: "provisional" },
  { keys: ["ballot drop", "drop box", "dropbox"], topic: "dropbox" },

  // Timeline & dates
  { keys: ["timeline", "dates", "schedule", "upcoming", "when is", "important dates"], topic: "timeline" },
  { keys: ["election day", "november", "when do i vote", "what day"], topic: "electionday" },
  { keys: ["primary", "primary election", "caucus", "primaries"], topic: "primary" },
  { keys: ["midterm", "mid-term", "off-year"], topic: "midterm" },
  { keys: ["runoff", "run-off", "second round"], topic: "runoff" },

  // Candidates & issues
  { keys: ["candidate", "research candidate", "evaluate", "compare candidate"], topic: "candidates" },
  { keys: ["red flag", "warning sign", "watch out", "shady candidate"], topic: "redflags" },
  { keys: ["ballot measure", "proposition", "referendum", "initiative"], topic: "ballot_measures" },
  { keys: ["endorsement", "who endorses"], topic: "endorsements" },
  { keys: ["campaign finance", "donation", "who funds", "dark money", "super pac", "pac "], topic: "campaign_finance" },
  { keys: ["debate", "town hall", "forum"], topic: "debates" },
  { keys: ["fact check", "fact-check", "verify claim", "misinformation", "fake news"], topic: "factcheck" },

  // Resources & tools
  { keys: ["resource", "website", "link", "where to find", "useful site"], topic: "resources" },
  { keys: ["find polling", "where do i vote", "my polling place", "polling location"], topic: "find_polling" },
  { keys: ["sample ballot", "what is on my ballot", "ballot preview", "ballot lookup"], topic: "sample_ballot" },
  { keys: ["track ballot", "where is my ballot", "ballot status"], topic: "track_ballot" },
  { keys: ["mistake", "spoil", "error on ballot", "messed up"], topic: "spoiled_ballot" },

  // Civic knowledge
  { keys: ["electoral college", "how president elected", "electors"], topic: "electoral_college" },
  { keys: ["gerrymandering", "redistricting", "district lines"], topic: "gerrymandering" },
  { keys: ["political party", "democrat", "republican", "independent", "libertarian", "green party", "third party"], topic: "parties" },
  { keys: ["branches of government", "executive", "legislative", "judicial", "congress", "president", "supreme court", "house of representatives", "senate"], topic: "branches" },
  { keys: ["swing state", "battleground", "purple state", "safe state"], topic: "swing_states" },
  { keys: ["filibuster", "cloture", "senate rules", "60 votes"], topic: "filibuster" },
  { keys: ["voter suppression", "suppression", "voter intimidation"], topic: "suppression" },
  { keys: ["voter fraud", "election fraud", "is voting safe", "election security"], topic: "security" },
  { keys: ["voter turnout", "turnout", "participation rate"], topic: "turnout" },
  { keys: ["why vote", "does my vote matter", "why should i vote", "importance of voting"], topic: "why_vote" },
  { keys: ["history of voting", "voting rights", "suffrage", "amendment"], topic: "voting_history" },
  { keys: ["poll worker", "election judge", "volunteer", "work the polls"], topic: "poll_worker" },
  { keys: ["accessibility", "disabled", "disability", "wheelchair", "curbside"], topic: "accessibility" },
  { keys: ["clothing", "shirt", "hat", "electioneering", "apparel"], topic: "apparel" },
  { keys: ["line", "long line", "waiting in line"], topic: "lines" },
  { keys: ["machine broken", "broken machine", "scanner broken"], topic: "broken_machine" },
  { keys: ["student", "college", "university", "student vote"], topic: "student_voting" },
  { keys: ["felon", "felony", "criminal record", "incarcerated"], topic: "felon_voting" },
  { keys: ["ranked choice", "rcv", "instant runoff", "rank"], topic: "ranked_choice" },
  { keys: ["local election", "city council", "mayor", "school board", "county"], topic: "local_elections" },

  // Quiz & social
  { keys: ["quiz", "test", "trivia", "knowledge test"], topic: "quiz" },
  { keys: ["thank", "thanks", "bye", "goodbye", "see you", "later"], topic: "thanks" },
];

function match(input) {
  const lower = input.toLowerCase();
  for (const p of patterns) {
    if (p.keys.some((k) => {
      // Use exact word match for very short keywords like "hi"
      if (k.trim() === "hi" || k.trim() === "hey" || k.trim() === "bye") {
        const words = lower.split(/[\s,!?.]+/);
        return words.includes(k.trim());
      }
      return lower.includes(k);
    })) return p.topic;
  }
  return null;
}

export function getQuizQuestion(idx) {
  return idx < questions.length ? questions[idx] : null;
}

export function processMessage(input, quizState) {
  // ── Quiz mode ──
  if (quizState && quizState.active) {
    const q = questions[quizState.index];
    const ai = parseInt(input, 10) - 1;
    const correct = ai === q.correctIndex;
    const newScore = quizState.score + (correct ? 1 : 0);
    const nextIdx = quizState.index + 1;
    const done = nextIdx >= questions.length;
    let text = correct
      ? `Correct! ${q.explanation}`
      : `Not quite. The answer was **${q.options[q.correctIndex]}**. ${q.explanation}`;
    if (done) {
      const pct = Math.round((newScore / questions.length) * 100);
      const badge = pct >= 80 ? "Democracy Champion" : pct >= 50 ? "Informed Voter" : "Novice";
      text += `\n\nQuiz complete! You scored **${newScore}/${questions.length}** (${pct}%) — **${badge}**!`;
      return { text, suggestions: TOPICS, quiz: null };
    }
    const next = questions[nextIdx];
    text += `\n\n**Question ${nextIdx + 1}:** ${next.question}\n${next.options.map((o, i) => `${i + 1}. ${o}`).join("\n")}\n\nReply with 1-4.`;
    return { text, suggestions: [], quiz: { active: true, index: nextIdx, score: newScore } };
  }

  const topic = match(input);

  const responses = {
    greeting: {
      text: "Hello! I am the **VoteSaathi Assistant** — your guide to the election process. What would you like to learn about?",
      suggestions: TOPICS,
    },
    how_are_you: {
      text: "I am doing great and ready to help you with anything related to elections and voting! What can I assist you with today?",
      suggestions: TOPICS,
    },
    who_are_you: {
      text: "I am **VoteSaathi**, an AI-powered civic assistant. I was created to help voters navigate the election process, understand their rights, and research candidates effectively. I am entirely non-partisan.",
      suggestions: ["What can you do?", "Find resources", "Take a Quiz"],
    },
    capabilities: {
      text: "**Here is what I can help you with:**\n\n- Finding how to register to vote\n- Explaining different voting methods (mail, early, in-person)\n- Tracking important election dates and deadlines\n- Providing tips on how to research candidates and spot red flags\n- Explaining complex civic concepts like the Electoral College\n\nJust ask me a question!",
      suggestions: TOPICS,
    },
    bye: {
      text: "Goodbye! Remember that your vote is your voice. Don't hesitate to return if you have more questions. Have a great day!",
      suggestions: ["Start over"],
    },
    registration: {
      text: `**Voter Registration Guide**\n\nThere are **3 steps** to register:\n${registrationSteps.map((s) => `\n**Step ${s.id}: ${s.title}**\n${s.description}`).join("\n")}\n\nDeadline is approximately **${daysUntilDeadline()} days** away. Register today!`,
      suggestions: ["Check eligibility", "Documents needed", "Check my registration"],
    },
    eligibility: {
      text: "**Am I eligible to vote?**\n\nYou can vote if you meet ALL of these:\n\n- U.S. citizen\n- At least 18 by Election Day\n- Resident of the state where you plan to vote\n- Not currently serving a disqualifying felony sentence\n- Mentally competent (rules vary by state)\n\nCheck your specific state requirements at **vote.gov**.",
      suggestions: ["How to register", "Documents needed", "Student voting"],
    },
    deadline: {
      text: `The registration deadline is approximately **${daysUntilDeadline()} days** away. Register today at **vote.gov**!\n\nSome states offer **same-day registration** — check yours.`,
      suggestions: ["How to register", "Same-day registration", "Election Timeline"],
    },
    documents: {
      text: "**What to bring when voting:**\n\n- **Photo ID** (driver license, passport, state ID)\n- **Non-photo ID** (utility bill, bank statement, voter registration card)\n- **Proof of address** (some states)\n\nRequirements vary by state. **35 states** require some form of ID. Check your state at vote.org/voter-id-laws.",
      suggestions: ["How to register", "Find my polling place", "Voting methods"],
    },
    sameday: {
      text: "**Same-Day Registration** is available in **21 states + DC**.\n\nYou can register and vote on the same day, including Election Day. You typically need:\n\n- Government-issued photo ID\n- Proof of current address\n\nCheck if your state offers this at vote.org.",
      suggestions: ["How to register", "Deadline", "Find my polling place"],
    },
    update_reg: {
      text: "**Update Your Registration:**\n\n- **Moved?** Update your address with your state election office\n- **Changed name?** Update before the registration deadline\n- **Changed party?** Some states require this before primary elections\n\nUpdate online at **vote.gov** or through your state website.",
      suggestions: ["Check my registration", "Deadline", "Find my polling place"],
    },
    check_reg: {
      text: "**Check Your Registration Status:**\n\nVisit **vote.org/am-i-registered** or your state election website.\n\nYou can verify:\n- Your registration is active\n- Your address is current\n- Your polling place assignment\n- Your party affiliation (if applicable)",
      suggestions: ["Update registration", "Find my polling place", "Voting methods"],
    },
    "in-person": methodInfo("in-person"),
    "early-voting": methodInfo("early-voting"),
    "mail-in": methodInfo("mail-in"),
    absentee: methodInfo("absentee"),
    methods: {
      text: `**There are 4 ways to vote:**\n\n${votingMethods.map((m) => `${m.icon} **${m.name}** — ${m.steps.length} steps`).join("\n")}\n\nWhich method would you like to learn about?`,
      suggestions: votingMethods.map((m) => m.name),
    },
    provisional: {
      text: "**Provisional Ballots:**\n\nYou receive a provisional ballot when:\n- Your name is not on the voter rolls\n- You forgot your ID\n- There is a question about your eligibility\n\nYour ballot is set aside and counted after your eligibility is confirmed. You can track its status through your state election office.",
      suggestions: ["What to bring", "Find my polling place", "Voting methods"],
    },
    dropbox: {
      text: "**Ballot Drop Boxes:**\n\nSecure, official drop boxes are available in many states for returning your mail-in or absentee ballot.\n\n- **Available 24/7** in most locations\n- **Monitored** by election officials and security cameras\n- **Faster** than mailing — no postage needed\n\nFind your nearest drop box through your local election office.",
      suggestions: ["Mail-in voting", "Absentee voting", "Election Timeline"],
    },
    timeline: (() => {
      const upcoming = getUpcoming();
      const lines = upcoming.map((m) => `- **${fmtDate(m.date)}** — ${m.title}: ${m.description}`);
      return {
        text: `**Upcoming Election Milestones:**\n\n${lines.join("\n")}${upcoming.length === 0 ? "No upcoming milestones at this time." : ""}`,
        suggestions: ["Voter Registration", "Voting Methods", "Election Day"],
      };
    })(),
    electionday: {
      text: "**General Election Day** is the **first Tuesday after the first Monday in November**. For 2026, that is **November 3, 2026**.\n\nPolls are typically open **7 AM to 8 PM** (varies by state). Plan to arrive at least 30 minutes before closing.",
      suggestions: ["Find my polling place", "What to bring", "Early voting"],
    },
    primary: {
      text: "**Primary Elections:**\n\nPrimaries select each party's nominee for the general election.\n\n- **Open primary** — any registered voter can participate\n- **Closed primary** — only registered party members can vote\n- **Semi-closed** — registered members + independents\n- **Caucus** — local meetings where voters discuss and vote\n\nCheck your state primary type and date at your state election website.",
      suggestions: ["Election Timeline", "Candidate Research", "How to register"],
    },
    midterm: {
      text: "**Midterm Elections:**\n\nHeld halfway through a president's term (even years without a presidential race).\n\nWhat is on the ballot:\n- All **435 House** seats\n- About **33-34 Senate** seats\n- Many **governor** and state legislature races\n- Local offices and ballot measures\n\nMidterms are just as important as presidential elections!",
      suggestions: ["Local elections", "Election Timeline", "Why vote"],
    },
    runoff: {
      text: "**Runoff Elections:**\n\nWhen no candidate reaches the required vote threshold (often 50%), the top two candidates advance to a runoff.\n\nCommon in:\n- Georgia, Louisiana, Texas, and other states\n- Local and primary elections\n\nRunoffs have lower turnout, so **your vote matters even more**.",
      suggestions: ["Ranked choice voting", "Primary elections", "Election Timeline"],
    },
    candidates: {
      text: `**How to research candidates:**\n\n${candidateCriteria.map((c) => `- **${c.category}:** ${c.criteria}`).join("\n")}\n\nUse non-partisan sources like Ballotpedia, Vote Smart, and FactCheck.org.`,
      suggestions: ["Red flags", "Campaign finance", "Find resources"],
    },
    redflags: {
      text: "**Red flags in candidates:**\n\n- Refuses to release financial disclosures\n- Makes promises with no clear implementation plan\n- Attacks opponents personally instead of debating policy\n- Disproportionate funding from a single industry\n- Avoids public debates or press conferences\n- History of flip-flopping without explanation\n- Uses fear or divisive rhetoric instead of facts\n- No clear track record of public service",
      suggestions: ["Research candidates", "Fact-checking", "Find resources"],
    },
    ballot_measures: {
      text: "**Understanding Ballot Measures:**\n\n- **Initiative** — proposed by citizens via petition\n- **Referendum** — legislature refers a law for voter approval\n- **Constitutional amendment** — changes to state constitution\n\n**Tips:**\n- Read the full text, not just the summary\n- Check who funds support/opposition\n- Review the fiscal impact statement\n- Consult Ballotpedia for neutral analysis",
      suggestions: ["Candidate Research", "Find resources", "Sample ballot"],
    },
    endorsements: {
      text: "**Understanding Endorsements:**\n\nEndorsements come from:\n- **Newspapers** (editorial boards)\n- **Organizations** (unions, advocacy groups)\n- **Elected officials** and community leaders\n\n**Evaluate carefully:**\n- Consider the endorser's credibility and motives\n- An endorsement is one data point, not a mandate\n- Look for endorsements from non-partisan organizations",
      suggestions: ["Candidate Research", "Campaign finance", "Red flags"],
    },
    campaign_finance: {
      text: "**Campaign Finance:**\n\n- **Individual donations** — limited per candidate per election\n- **PACs** — Political Action Committees pool donations\n- **Super PACs** — unlimited spending, no direct coordination with candidates\n- **Dark money** — spending by groups that don't disclose donors\n\nTrack money in politics at **OpenSecrets.org**.",
      suggestions: ["Red flags", "Candidate Research", "Find resources"],
    },
    debates: {
      text: "**Evaluating Debates:**\n\nLook for:\n- **Substance** — specific policy proposals vs. vague promises\n- **Accuracy** — fact-check claims afterward\n- **Composure** — how they handle tough questions\n- **Respect** — do they engage with ideas or attack people?\n\nDebates are a window into how candidates would lead. Watch them on C-SPAN or your local PBS station.",
      suggestions: ["Candidate Research", "Red flags", "Fact-checking"],
    },
    factcheck: {
      text: "**Fact-Checking Resources:**\n\n- **FactCheck.org** — non-partisan, Annenberg Public Policy Center\n- **PolitiFact** — rates claims on a Truth-O-Meter scale\n- **Snopes** — debunks viral claims and rumors\n- **AP Fact Check** — by the Associated Press\n- **Washington Post Fact Checker** — Pinocchio rating system\n\n**Tip:** If something sounds too extreme to be true, check it before sharing!",
      suggestions: ["Candidate Research", "Red flags", "Find resources"],
    },
    resources: {
      text: `**Trusted Election Resources:**\n\n${resources.map((r) => `- **${r.name}** (${r.type}) — ${r.description}`).join("\n")}`,
      suggestions: ["Voter Registration", "Fact-checking", "Take a Quiz"],
    },
    find_polling: {
      text: "**Find Your Polling Place:**\n\n1. Visit **vote.org/polling-place-locator**\n2. Enter your registered address\n3. Get your assigned polling location, hours, and directions\n\nYou can also:\n- Call your local county election office\n- Check your state Secretary of State website\n- Look at the back of your voter registration card",
      suggestions: ["What to bring", "Early voting", "Accessibility"],
    },
    sample_ballot: {
      text: "**Preview Your Ballot:**\n\n- **VOTE411.org** — enter your address for a personalized ballot\n- **Ballotpedia** — comprehensive ballot information\n- Your **county election website** often has sample ballots\n\nReview your ballot before Election Day so you are prepared and can vote quickly.",
      suggestions: ["Ballot measures", "Candidate Research", "Find my polling place"],
    },
    track_ballot: {
      text: "**Track Your Ballot:**\n\nMost states allow you to track your mail-in or absentee ballot online.\n\n- Visit your state election website\n- You can see when it was mailed to you, received by officials, and counted\n- If your ballot is rejected (e.g., mismatched signature), you often have a chance to 'cure' or fix it.",
      suggestions: ["Mail-in voting", "Provisional ballot", "Update registration"],
    },
    spoiled_ballot: {
      text: "**Made a mistake on your ballot?**\n\nDo NOT cross it out or try to fix it. This is called a 'spoiled ballot'.\n\n- **In person:** Ask a poll worker for a new ballot. They will void the old one.\n- **Mail-in:** Contact your local election office immediately to request a replacement ballot.",
      suggestions: ["How to vote", "Find my polling place", "Track ballot"],
    },
    electoral_college: {
      text: "**The Electoral College:**\n\n- **538 total electors** (270 needed to win)\n- Each state gets electors equal to its Congressional delegation\n- Most states use **winner-take-all**\n- Maine and Nebraska split electors by congressional district\n\nThe Electoral College was established by the Constitution as a compromise between Congress and popular vote.",
      suggestions: ["Why vote", "Voter turnout", "Voting history"],
    },
    gerrymandering: {
      text: "**Gerrymandering:**\n\nThe manipulation of district boundaries to favor one party.\n\n- **Packing** — concentrating opposition voters in few districts\n- **Cracking** — spreading opposition voters across many districts\n\nSome states use **independent redistricting commissions** to draw fairer maps. Organizations like FairVote advocate for reform.",
      suggestions: ["Electoral college", "Why vote", "Local elections"],
    },
    parties: {
      text: "**Political Parties in the U.S.:**\n\nThe U.S. is dominated by a two-party system:\n- **Democratic Party** (generally progressive/liberal platform)\n- **Republican Party** (generally conservative platform)\n\n**Third Parties** also run candidates, including the Libertarian Party, Green Party, and Forward Party. Over 40% of Americans identify as **Independents** (not affiliated with any party).",
      suggestions: ["Primary elections", "Candidate Research", "Find resources"],
    },
    branches: {
      text: "**Three Branches of Government:**\n\n1. **Legislative (Congress):** Makes laws. Includes the House of Representatives (435 members) and the Senate (100 members).\n2. **Executive (President & Cabinet):** Enforces laws. Includes the military and federal agencies.\n3. **Judicial (Supreme Court & Federal Courts):** Interprets laws and ensures they are constitutional.\n\nThis system creates **checks and balances** so no single branch becomes too powerful.",
      suggestions: ["Midterm elections", "Local elections", "Electoral college"],
    },
    swing_states: {
      text: "**Swing States (Battleground States):**\n\nStates where both major political parties have similar levels of support, meaning the state could \"swing\" to either candidate. Because most states award all their electoral votes to the winner, presidential candidates spend most of their time and money campaigning in these states.\n\n**Safe States** are those that reliably vote for one party every election.",
      suggestions: ["Electoral college", "Campaign finance", "Voter turnout"],
    },
    filibuster: {
      text: "**The Filibuster:**\n\nA rule in the U.S. Senate that allows a minority of senators to delay or block a vote on a bill. It requires a **60-vote supermajority** (called \"cloture\") to overcome the filibuster and proceed to a final majority vote.\n\nThis means most major legislation requires 60 votes to pass the Senate, rather than a simple majority of 51.",
      suggestions: ["Branches of government", "Midterm elections", "Why vote"],
    },
    suppression: {
      text: "**Voter Suppression:**\n\nTactics that discourage or prevent people from voting:\n\n- Strict ID laws without free ID access\n- Reduced polling places in certain areas\n- Voter roll purges\n- Intimidation at polling places\n\n**Know your rights:** If you face issues, call the **Election Protection Hotline: 1-866-OUR-VOTE** (1-866-687-8683).",
      suggestions: ["Provisional ballot", "Accessibility", "Why vote"],
    },
    security: {
      text: "**Election Security:**\n\nU.S. elections have **multiple safeguards:**\n\n- Paper ballot backups in most jurisdictions\n- Bipartisan election observers\n- Post-election audits and recounts\n- Chain-of-custody protocols\n- Cybersecurity measures for voting systems\n\nStudies consistently show voter fraud is **extremely rare** (less than 0.0001% of votes cast).",
      suggestions: ["How to vote", "Election Timeline", "Find resources"],
    },
    turnout: {
      text: "**Voter Turnout Facts:**\n\n- **2020 presidential** — ~67% (highest in a century)\n- **2022 midterm** — ~47%\n- **Local elections** — often below 20%\n\nYoung voters (18-29) have the lowest turnout. **Your vote has the most impact in local elections** where margins are often tiny!",
      suggestions: ["Why vote", "Local elections", "How to register"],
    },
    why_vote: {
      text: "**Why Your Vote Matters:**\n\n- Elections are often decided by **small margins**\n- Local races can be won by **a handful of votes**\n- Elected officials make decisions that affect your daily life — from roads to schools to healthcare\n- Voting is how you hold leaders **accountable**\n- Many people fought and died for your right to vote\n\n**Every single vote counts.** Make yours heard!",
      suggestions: ["How to register", "Voting methods", "Election Timeline"],
    },
    voting_history: {
      text: "**History of Voting Rights:**\n\n- **1870** — 15th Amendment: right to vote regardless of race\n- **1920** — 19th Amendment: women's suffrage\n- **1924** — Indian Citizenship Act: Native Americans\n- **1965** — Voting Rights Act: prohibited discrimination\n- **1971** — 26th Amendment: lowered voting age to 18\n- **1993** — Motor Voter Act: easier registration\n\nEvery generation has expanded who can participate in democracy.",
      suggestions: ["Why vote", "Voter turnout", "Eligibility"],
    },
    poll_worker: {
      text: "**Become a Poll Worker:**\n\nPoll workers are essential to elections!\n\n- **Get paid** ($100-$300/day in most jurisdictions)\n- **Training provided** by your local election office\n- **Requirements** — must be a registered voter, some states allow 16-17 year olds\n\nApply at **workelections.org** or contact your county election office.",
      suggestions: ["Election Day", "Find my polling place", "Why vote"],
    },
    accessibility: {
      text: "**Accessible Voting:**\n\nEvery polling place must provide:\n\n- **Wheelchair accessible** entrance and voting booth\n- **Curbside voting** for those who cannot enter\n- **Accessible voting machines** with audio, large print, and braille\n- **Language assistance** (required in certain jurisdictions)\n\nIf you need help, contact your election office in advance or call **1-866-OUR-VOTE**.",
      suggestions: ["Find my polling place", "Voting methods", "Absentee voting"],
    },
    apparel: {
      text: "**Political Clothing at the Polls:**\n\nMost states have **'electioneering' laws** that prohibit wearing clothing, hats, or buttons supporting a specific candidate or issue inside or near the polling place.\n\nPlay it safe: Wear neutral clothing to vote to avoid being turned away or asked to cover up.",
      suggestions: ["What to bring", "Find my polling place", "Election Day"],
    },
    lines: {
      text: "**Voting Lines:**\n\nIf you are in line when the polls officially close, **STAY IN LINE**. You have the legal right to vote as long as you were in line before closing time.\n\nIf anyone tries to turn you away, call the Election Protection Hotline: 1-866-OUR-VOTE.",
      suggestions: ["Election Day", "Early voting", "Voter suppression"],
    },
    broken_machine: {
      text: "**Broken Voting Machines:**\n\nIf voting machines are broken, poll workers must provide an alternative, such as an **emergency paper ballot**.\n\nDo not leave without voting. Ask for a paper ballot or call the Election Protection Hotline at 1-866-OUR-VOTE if you are denied the right to vote.",
      suggestions: ["Election Day", "Find my polling place", "Voter suppression"],
    },
    student_voting: {
      text: "**Student Voting Guide:**\n\n- You can register at your **college address** or home address — your choice\n- **Student IDs** are accepted in some states\n- Some states have polling places **on campus**\n- If away from home, request an **absentee ballot**\n\nOrganizations like TurboVote and Campus Vote Project can help.",
      suggestions: ["How to register", "Absentee voting", "Documents needed"],
    },
    felon_voting: {
      text: "**Felony and Voting Rights:**\n\nRights vary significantly by state:\n\n- **Maine and Vermont** — can vote even while incarcerated\n- **Most states** — rights restored after sentence completion\n- **Some states** — require a waiting period or petition\n- **A few states** — permanent disenfranchisement for some offenses\n\nCheck your state at **aclu.org/know-your-rights/voting-rights**.",
      suggestions: ["Eligibility", "How to register", "Find resources"],
    },
    ranked_choice: {
      text: "**Ranked Choice Voting (RCV):**\n\nVoters rank candidates in order of preference.\n\n- If no one gets 50%+, the last-place candidate is eliminated\n- Their voters' second choices are redistributed\n- Process repeats until someone reaches a majority\n\n**Currently used in:** Alaska, Maine, NYC, and other cities. Advocates say it reduces negative campaigning and spoiler effects.",
      suggestions: ["Voting methods", "Local elections", "Primary elections"],
    },
    local_elections: {
      text: "**Local Elections Matter Most:**\n\nLocal officials directly impact your daily life:\n\n- **School board** — education policy, budgets, curriculum\n- **City council** — zoning, public safety, local taxes\n- **Mayor** — city administration and policy\n- **County officials** — roads, courts, public health\n- **Sheriff/DA** — criminal justice\n\nThese races often have the **lowest turnout** but the **highest impact** on your community.",
      suggestions: ["How to vote", "Sample ballot", "Why vote"],
    },
    quiz: (() => {
      const q = questions[0];
      return {
        text: `Let us test your election knowledge! 10 questions, ready?\n\n**Question 1:** ${q.question}\n${q.options.map((o, i) => `${i + 1}. ${o}`).join("\n")}\n\nReply with 1-4.`,
        suggestions: [],
        quiz: { active: true, index: 0, score: 0 },
      };
    })(),
    thanks: {
      text: "You are welcome! Remember, **every vote counts**. Feel free to ask me anything else about the election process!",
      suggestions: TOPICS,
    },
  };

  if (topic && responses[topic]) return responses[topic];

  // No match — return null so ChatWidget can try AI fallback
  return null;
}
