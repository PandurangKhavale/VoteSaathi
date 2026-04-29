import Home from "./components/Home";
import ChatWidget from "./components/ChatWidget";
import ScrollIndicator from "./components/ui/ScrollIndicator";

export default function App() {
  return (
    <>
      <ScrollIndicator />
      <Home />
      <ChatWidget />
    </>
  );
}
