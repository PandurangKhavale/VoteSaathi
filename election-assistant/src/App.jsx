import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import VoterRegistration from "./components/VoterRegistration";
import ElectionTimeline from "./components/ElectionTimeline";
import CandidateInfo from "./components/CandidateInfo";
import VotingMethods from "./components/VotingMethods";
import Quiz from "./components/Quiz";
import InteractiveGuide from "./components/InteractiveGuide";
import ChatWidget from "./components/ChatWidget";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import Navigation from "./components/Navigation";
import { initializeGA, trackScrollDepth } from "./utils/analyticsService";
import useAnalyticsTracking from "./hooks/useAnalyticsTracking";

export default function App() {
  // Initialize Google Analytics on app mount
  useEffect(() => {
    initializeGA();

    // Scroll depth tracking
    let maxDepth = 0;
    const handleScroll = () => {
      const depth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (depth > maxDepth && depth % 25 === 0) {
        maxDepth = depth;
        trackScrollDepth(depth);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track page views on route changes
  useAnalyticsTracking();

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-civic-gold focus:text-white focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <ScrollIndicator />
      <div id="main-content" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<VoterRegistration />} />
          <Route path="/timeline" element={<ElectionTimeline />} />
          <Route path="/candidates" element={<CandidateInfo />} />
          <Route path="/voting-methods" element={<VotingMethods />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/guide" element={<InteractiveGuide />} />
        </Routes>
      </div>
      <ChatWidget />
    </>
  );
}
