export const registrationSteps = [
  {
    id: 1,
    title: "Check Your Eligibility",
    description:
      "Verify that you meet all requirements to register to vote in your state.",
    documents: [
      "Proof of U.S. citizenship (birth certificate, passport, or naturalization certificate)",
      "Government-issued photo ID (driver license or state ID)",
      "Proof of residency (utility bill, bank statement, or lease)",
    ],
    tips: [
      "You must be at least 18 by Election Day in most states.",
      "Some states let 17-year-olds register if they turn 18 before the general election.",
      "Felony voting rights vary by state - check yours.",
    ],
  },
  {
    id: 2,
    title: "Gather Required Documents",
    description:
      "Collect all necessary identification and documentation before starting registration.",
    documents: [
      "Social Security Number (full or last 4 digits)",
      "State-issued driver license or ID number",
      "Current residential address documentation",
    ],
    tips: [
      "Make copies of all documents for your records.",
      "Update your address if you have recently moved.",
      "Some states accept student IDs as valid identification.",
    ],
  },
  {
    id: 3,
    title: "Submit Your Registration",
    description:
      "Choose your preferred method to submit your voter registration application.",
    documents: [
      "Completed voter registration form",
      "Supporting identification documents",
      "Stamped envelope (if mailing your registration)",
    ],
    tips: [
      "Online registration is available in most states at vote.gov.",
      "You can also register at your local DMV or election office.",
      "Mail-in registration must be postmarked by your state deadline.",
    ],
  },
];

export const votingMethods = [
  {
    id: "in-person",
    name: "In-Person Voting",
    icon: "\u{1F3DB}\uFE0F",
    steps: [
      "Find your assigned polling place using your state voter lookup tool.",
      "Bring required identification to the polling location.",
      "Check in with poll workers and sign the voter roll.",
      "Receive your ballot and proceed to a voting booth.",
      "Mark your selections carefully following ballot instructions.",
      "Insert your completed ballot into the scanner or ballot box.",
      "Collect your I Voted sticker.",
    ],
    pros: [
      "Immediate confirmation your vote was counted",
      "Access to poll workers for assistance",
      "Familiar, traditional voting experience",
    ],
    cons: [
      "Potential long wait times during peak hours",
      "Limited to specific polling location hours",
      "May need to take time off work",
    ],
  },
  {
    id: "early-voting",
    name: "Early Voting",
    icon: "\u{1F4C5}",
    steps: [
      "Check your state early voting period and locations.",
      "Find the nearest early voting center.",
      "Bring valid photo identification.",
      "Cast your ballot at any designated early voting location.",
      "Confirm your vote was recorded before leaving.",
    ],
    pros: [
      "Avoid Election Day crowds and long lines",
      "Flexible scheduling over multiple days",
      "Same security as Election Day voting",
    ],
    cons: [
      "Not available in all states",
      "Fewer locations than Election Day",
      "Limited hours at some locations",
    ],
  },
  {
    id: "mail-in",
    name: "Mail-In Voting",
    icon: "\u{1F4EC}",
    steps: [
      "Request a mail-in ballot from your local election office.",
      "Receive your ballot package in the mail.",
      "Read all instructions carefully.",
      "Mark your selections using the provided pen or marker.",
      "Seal your ballot in the security envelope.",
      "Sign the outer envelope where indicated.",
      "Mail your ballot or drop it at an official drop box before the deadline.",
    ],
    pros: [
      "Vote from the comfort of your home",
      "Take your time researching candidates",
      "Accessible for those with mobility challenges",
    ],
    cons: [
      "Must request ballot ahead of time",
      "Risk of ballot arriving late",
      "Strict signature-matching requirements",
    ],
  },
  {
    id: "absentee",
    name: "Absentee Voting",
    icon: "\u2708\uFE0F",
    steps: [
      "Determine if you qualify for an absentee ballot in your state.",
      "Submit an absentee ballot application with required documentation.",
      "Receive and review your absentee ballot.",
      "Complete your ballot following all provided instructions.",
      "Return your ballot by mail, fax, or email (varies by state).",
      "Track your ballot status using your state tracking system.",
    ],
    pros: [
      "Vote from anywhere in the world",
      "Essential for military and overseas voters",
      "Multiple return options available",
    ],
    cons: [
      "May require a valid excuse in some states",
      "Longer processing and verification times",
      "Must plan well in advance",
    ],
  },
];

export const candidateCriteria = [
  {
    id: 1,
    category: "Policy Positions",
    criteria: "Review their stance on key issues such as healthcare, education, economy, and environment.",
    why: "Understanding where candidates stand helps you align your vote with your values.",
  },
  {
    id: 2,
    category: "Voting Record",
    criteria: "Check their legislative history and past votes on important bills.",
    why: "Past actions are the best predictor of future behavior in office.",
  },
  {
    id: 3,
    category: "Campaign Funding",
    criteria: "Investigate who funds their campaign and look for potential conflicts of interest.",
    why: "Funding sources can reveal whose interests a candidate may prioritize.",
  },
  {
    id: 4,
    category: "Endorsements",
    criteria: "Review endorsements from organizations, newspapers, and community leaders.",
    why: "Endorsements from trusted sources can help validate credibility.",
  },
  {
    id: 5,
    category: "Experience",
    criteria: "Evaluate relevant professional and political experience for the role.",
    why: "Experience in governance indicates preparedness for office.",
  },
  {
    id: 6,
    category: "Community Engagement",
    criteria: "Assess involvement in community service and local issues.",
    why: "Active engagement shows commitment to constituents beyond election season.",
  },
  {
    id: 7,
    category: "Debate Performance",
    criteria: "Watch debates and town halls to evaluate communication and composure.",
    why: "How candidates handle pressure reflects their leadership ability.",
  },
  {
    id: 8,
    category: "Fact-Check Claims",
    criteria: "Verify campaign promises and claims through independent fact-checkers.",
    why: "Separating fact from rhetoric ensures an informed decision.",
  },
];

export const resources = [
  { name: "Vote.gov", url: "https://vote.gov", description: "Official U.S. government voter registration and election information.", type: "Government" },
  { name: "Ballotpedia", url: "https://ballotpedia.org", description: "Comprehensive encyclopedia of American politics and elections.", type: "Encyclopedia" },
  { name: "Vote Smart", url: "https://justfacts.votesmart.org", description: "Non-partisan research on candidates and voting records.", type: "Research" },
  { name: "OpenSecrets", url: "https://www.opensecrets.org", description: "Tracks money in politics, campaign finance, and lobbying data.", type: "Finance" },
  { name: "FactCheck.org", url: "https://www.factcheck.org", description: "Non-partisan fact-checking of political claims and ads.", type: "Fact-Check" },
  { name: "League of Women Voters", url: "https://www.lwv.org", description: "Non-partisan voter guides and election resources.", type: "Organization" },
  { name: "USA.gov Elections", url: "https://www.usa.gov/election", description: "Federal portal for election dates, registration, and voting abroad.", type: "Government" },
  { name: "VOTE411", url: "https://www.vote411.org", description: "Personalized voting information including ballot lookup.", type: "Voter Guide" },
];
