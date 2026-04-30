import { useEffect } from "react";
import Home from "./components/Home";
import ChatWidget from "./components/ChatWidget";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import { initializeGA } from "./utils/analyticsService";
import useAnalyticsTracking from "./hooks/useAnalyticsTracking";

export default function App() {
  // Initialize Google Analytics on app mount
  useEffect(() => {
    initializeGA();
  }, []);

  // Track page views on route changes
  useAnalyticsTracking();

  return (
    <>
      <ScrollIndicator />
      <Home />
      <ChatWidget />
    </>
  );
}
